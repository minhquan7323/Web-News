import imageCompression from 'browser-image-compression'


export const uploadToCloudinary = async (file) => {
    try {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
        }
        const compressedFile = await imageCompression(file, options)

        const data = new FormData()
        data.append('file', compressedFile)
        data.append('upload_preset', `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`)
        data.append('cloud_name', `${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}`)

        const response = await fetch(`${import.meta.env.VITE_CLOUDINARY}`, {
            method: 'POST',
            body: data,
        })

        const result = await response.json()
        if (!result.url) {
            throw new Error('No URL returned from Cloudinary')
        }

        return result.url
    } catch (error) {
        console.error('Error uploading image:', error)
        throw error
    }
}
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