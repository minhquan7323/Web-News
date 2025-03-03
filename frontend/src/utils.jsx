import imageCompression from 'browser-image-compression';
import { Clerk } from "@clerk/clerk-js";

export const uploadToCloudinary = async (file) => {
    try {
        const data = new FormData();
        let fileToUpload = file;

        if (file.type.startsWith("image/")) {
            const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
            fileToUpload = await imageCompression(file, options);
        }

        data.append("file", fileToUpload);
        data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        data.append("resource_type", file.type.startsWith("video/") ? "video" : "image");

        const response = await fetch(`${import.meta.env.VITE_CLOUDINARY}/upload`, {
            method: "POST",
            body: data,
        });

        const result = await response.json();
        if (!result.secure_url) throw new Error("No URL returned from Cloudinary");

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