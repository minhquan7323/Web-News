import imageCompression from 'browser-image-compression'


export const uploadToCloudinary = async (file) => {
    try {
        const data = new FormData();
        let fileToUpload = file;

        // Nếu là ảnh → Nén trước khi upload
        if (file.type.startsWith("image/")) {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
            };
            fileToUpload = await imageCompression(file, options);
        }

        data.append("file", fileToUpload);
        data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        const resourceType = file.type.startsWith("video/") ? "video" : "image";
        data.append("resource_type", resourceType);

        const response = await fetch(`${import.meta.env.VITE_CLOUDINARY}/upload`, {
            method: "POST",
            body: data,
        });

        const result = await response.json();
        if (!result.secure_url) {
            throw new Error("No URL returned from Cloudinary");
        }

        // Nếu là video, ép URL về dạng `.mp4`
        if (resourceType === "video") {
            return result.secure_url.replace("/upload/", "/upload/f_mp4/");
        }

        return result.secure_url;
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

    window.fbAsyncInit = function () {
        if (window.FB) {
            window.FB.init({
                appId: import.meta.env.VITE_FB_ID,
                cookie: true,
                xfbml: true,
                version: 'v8.6',
            });
        } else {
            console.error("Facebook SDK failed to load.");
        }
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