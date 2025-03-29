import React from 'react'
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react'
import { uploadToCloudinary } from '../utils'

const Editor = ({ value, onChange, placeholder = "<p>Nhập nội dung tại đây...</p>" }) => {
    return (
        <TinyMCEEditor
            apiKey={import.meta.env.VITE_MCE_API_KEY}
            placeholder={placeholder}
            init={{
                height: 500,
                menubar: true,
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                image_uploadtab: true,
                file_picker_types: "image media",
                file_picker_callback: async (callback, value, meta) => {
                    const input = document.createElement("input")
                    input.setAttribute("type", "file")

                    if (meta.filetype === "image") {
                        input.setAttribute("accept", "image/*")
                    } else if (meta.filetype === "media") {
                        input.setAttribute("accept", "video/*")
                    }

                    input.onchange = async function () {
                        const file = this.files[0]
                        if (file) {
                            const fileUrl = await uploadToCloudinary(file)
                            callback(fileUrl, { title: file.name })
                        }
                    }
                    input.click()
                },
            }}
            value={value}
            onEditorChange={onChange}
        />
    )
}

export default Editor