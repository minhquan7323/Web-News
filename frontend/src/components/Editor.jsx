import React, { useState } from 'react'
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react'
import { uploadToCloudinary } from '../utils'
import { useToast } from '@chakra-ui/react'

const Editor = ({ value, onChange, placeholder = "<p>Nhập nội dung tại đây...</p>" }) => {
    const toast = useToast()
    const [isUploading, setIsUploading] = useState(false)

    const handleFileUpload = async (callback, value, meta) => {
        try {
            setIsUploading(true)
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
                    try {
                        // Hiển thị thông báo đang xử lý nếu là video
                        if (file.type.startsWith("video/")) {
                            toast({
                                title: "Đang xử lý video",
                                description: "Vui lòng đợi trong giây lát...",
                                status: "info",
                                duration: 5000,
                                isClosable: true,
                            })
                        }

                        const fileUrl = await uploadToCloudinary(file)
                        callback(fileUrl, { title: file.name })
                        toast({
                            title: "Tải lên thành công",
                            status: "success",
                            duration: 3000,
                            isClosable: true,
                        })
                    } catch (error) {
                        console.error("Lỗi tải lên file:", error)

                        // Xử lý lỗi kích thước file
                        if (error.message.includes("File quá lớn")) {
                            toast({
                                title: "Lỗi kích thước file",
                                description: error.message,
                                status: "error",
                                duration: 8000,
                                isClosable: true,
                            })
                        } else {
                            toast({
                                title: "Lỗi tải lên file",
                                description: error.message || "Không thể tải lên file. Vui lòng thử lại.",
                                status: "error",
                                duration: 5000,
                                isClosable: true,
                            })
                        }
                    } finally {
                        setIsUploading(false)
                    }
                }
            }
            input.click()
        } catch (error) {
            console.error("Lỗi xử lý file:", error)
            toast({
                title: "Lỗi xử lý file",
                description: error.message || "Không thể xử lý file. Vui lòng thử lại.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            setIsUploading(false)
        }
    }

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
                file_picker_callback: handleFileUpload
            }}
            value={value}
            onEditorChange={onChange}
        />
    )
}

export default Editor