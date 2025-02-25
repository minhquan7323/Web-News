import { Box, Input, InputLeftAddon, InputGroup, Stack, Text, Button, HStack, Image, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { uploadToCloudinary } from '../utils'
const UpdateArticle = () => {
    const [imgDisplay, setImgDisplay] = useState('')
    const [stateProduct, setStateProduct] = useState({
        title: '',
        author: '',
        source: '',
        content: '',
        imageUrl: '',

    })
    const handleOnChangeAvatar = async (info) => {
        const file = info.target.files?.[0]
        if (!file) return
        const preview = await uploadToCloudinary(file)
        setImgDisplay(preview)

    }

    return (
        <Box pt={16}>
            <Box>
                <Box p={4}>
                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftAddon>Title</InputLeftAddon>
                            <Input placeholder='Title here' />
                        </InputGroup>
                        <HStack>
                            <InputGroup>
                                <InputLeftAddon>Author</InputLeftAddon>
                                <Input placeholder='Author here' />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon>Source</InputLeftAddon>
                                <Input placeholder='Source here' />
                            </InputGroup>
                        </HStack>
                    </Stack>
                </Box>

                <HStack spacing={4} p={4}>
                    <Button as="label" cursor="pointer">
                        Image to display
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleOnChangeAvatar}
                            hidden
                        />
                    </Button>
                    <Image src={imgDisplay} objectFit="cover" h="auto" w="400px" />
                </HStack>
                <Editor
                    apiKey={import.meta.env.VITE_MCE_API_KEY}
                    placeholder="<p>Nhập nội dung tại đây...</p>"
                    init={{
                        height: 500,
                        menubar: true,
                        plugins: "advlist autolink lists link image charmap preview anchor",
                        toolbar: "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image",
                        image_uploadtab: true,
                        file_picker_types: "image",
                        file_picker_callback: (callback, value, meta) => {
                            const input = document.createElement("input")
                            input.setAttribute("type", "file")
                            input.setAttribute("accept", "image/*")
                            input.onchange = function () {
                                const file = this.files[0]
                                const reader = new FileReader()
                                reader.onload = function () {
                                    const base64 = reader.result
                                    callback(base64, { title: file.name })
                                }
                                reader.readAsDataURL(file)
                            }
                            input.click()
                        },
                    }}
                    onEditorChange={(content) => setContent(content)}
                />
            </Box>
            <Flex justify="flex-end" p={4}>
                <Button colorScheme='green'>
                    <i className="fa-solid fa-plus"></i>
                    <Text as="span" paddingLeft={4}>Post</Text>
                </Button>
            </Flex><Flex justify="flex-end" p={4}>
                <Button colorScheme='green'>
                    <i className="fa-solid fa-plus"></i>
                    <Text as="span" paddingLeft={4}>Post</Text>
                </Button>
            </Flex><Flex justify="flex-end" p={4}>
                <Button colorScheme='green'>
                    <i className="fa-solid fa-plus"></i>
                    <Text as="span" paddingLeft={4}>Post</Text>
                </Button>
            </Flex><Flex justify="flex-end" p={4}>
                <Button colorScheme='green'>
                    <i className="fa-solid fa-plus"></i>
                    <Text as="span" paddingLeft={4}>Post</Text>
                </Button>
            </Flex>
        </Box>
    )
}

export default UpdateArticle
