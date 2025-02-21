import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Box } from "@chakra-ui/react";

const TinyMCEEditor = () => {
    const [content, setContent] = useState("");

    return (
        <Box paddingTop={20}>
            <Editor
                apiKey="5z186q6fbwvlsogmp3zjvdc5ztkwzadbgt49irrop6yj9pop"
                initialValue="<p>Nhập nội dung tại đây...</p>"
                init={{
                    height: 500,
                    menubar: true,
                    plugins: "advlist autolink lists link image charmap preview anchor",
                    toolbar: "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image",
                    image_uploadtab: true, // Hiển thị tab Upload
                    file_picker_types: "image", // Chỉ chọn file ảnh
                    file_picker_callback: (callback, value, meta) => {
                        const input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*"); // Chỉ nhận file ảnh
                        input.onchange = function () {
                            const file = this.files[0];
                            const reader = new FileReader();
                            reader.onload = function () {
                                const base64 = reader.result;
                                callback(base64, { title: file.name }); // Hiển thị ảnh ngay lập tức
                            };
                            reader.readAsDataURL(file);
                        };
                        input.click();
                    },
                }}
                onEditorChange={(content) => setContent(content)}
            />
        </Box>
    );
};

export default TinyMCEEditor;
