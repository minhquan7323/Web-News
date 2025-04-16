import imageCompression from 'browser-image-compression'
import { Clerk } from "@clerk/clerk-js";
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export const uploadToCloudinary = async (file) => {
    try {
        // Kiểm tra kích thước file
        const maxSize = 100 * 1024 * 1024; // 100MB (giới hạn của Cloudinary)
        if (file.size > maxSize) {
            throw new Error(`File quá lớn. Kích thước tối đa là ${maxSize / (1024 * 1024)}MB. File của bạn có kích thước ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
        }

        const data = new FormData();
        let fileToUpload = file;

        // Nén ảnh nếu là file ảnh
        if (file.type.startsWith("image/")) {
            const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
            fileToUpload = await imageCompression(file, options);
        }

        // Nén video nếu là file video
        if (file.type.startsWith("video/")) {
            // Thêm thông báo cho người dùng biết đang xử lý video
            console.log("Đang xử lý video, vui lòng đợi...");

            // Tạo một canvas để hiển thị khung hình đầu tiên của video
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);

            // Đợi video tải xong
            await new Promise((resolve) => {
                video.onloadedmetadata = () => {
                    video.currentTime = 0;
                    resolve();
                };
            });

            // Tạo canvas và vẽ khung hình đầu tiên
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Tạo thumbnail từ khung hình đầu tiên
            const thumbnailBlob = await new Promise(resolve => {
                canvas.toBlob(resolve, 'image/jpeg', 0.7);
            });

            // Thêm thumbnail vào FormData
            data.append("thumbnail", thumbnailBlob);

            // Giải phóng bộ nhớ
            URL.revokeObjectURL(video.src);
        }

        data.append("file", fileToUpload);
        data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        data.append("resource_type", file.type.startsWith("video/") ? "video" : "image");

        // Sử dụng mode: 'cors' và thêm credentials
        const response = await fetch(`${import.meta.env.VITE_CLOUDINARY}/upload`, {
            method: "POST",
            body: data,
            mode: 'cors',
            credentials: 'omit'
        });

        if (!response.ok) {
            // Xử lý lỗi 413 (Request Entity Too Large)
            if (response.status === 413) {
                throw new Error(`File quá lớn. Cloudinary chỉ chấp nhận file có kích thước tối đa 100MB. File của bạn có kích thước ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
            }

            const errorData = await response.json();
            throw new Error(`Lỗi tải lên: ${errorData.error?.message || response.statusText}`);
        }

        const result = await response.json();
        if (!result.secure_url) throw new Error("Không nhận được URL từ Cloudinary");

        return file.type.startsWith("video/")
            ? result.secure_url.replace("/upload/", "/upload/f_mp4/")
            : result.secure_url;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export const initFacebookSDK = () => {
    if (window.FB) {
        window.FB.XFBML.parse();
        return;
    }

    let locale = 'en_EN';

    window.fbAsyncInit = async function () {
        window.FB.init({
            appId: import.meta.env.VITE_FB_ID,
            cookie: true,
            xfbml: true,
            version: 'v8.6',
        });

        window.FB.getLoginStatus(async function (response) {
            if (response.status === "connected") {
                const fbToken = response.authResponse.accessToken;

                try {
                    const clerk = new Clerk(import.meta.env.VITE_CLERK_FRONTEND_API);
                    await clerk.load();

                    await clerk.client.signIn.create({
                        identifier: "facebook",
                        strategy: "oauth_facebook",
                        token: fbToken,
                    });

                } catch (error) {
                    console.error("Error signing in with Clerk:", error);
                }
            }
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = `https://connect.facebook.net/${locale}/sdk.js`;
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
};

export const sortByDate = (data) => {
    if (!Array.isArray(data)) return [];
    return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export const sortByUpdatedAt = (data) => {
    if (!Array.isArray(data)) return [];
    return data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
}

export const exportToExcel = ({ data, fileName = 'Export.xlsx', columns = [] }) => {
    if (!data || data.length === 0) return

    const exportData = data.map(item => {
        const row = {}
        columns.forEach(col => {
            row[col.label] = typeof col.value === 'function' ? col.value(item) : item[col.value]
        })
        return row
    })

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(dataBlob, fileName)
}