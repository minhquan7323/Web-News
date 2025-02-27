import { Box, Input, InputLeftAddon, InputGroup, Stack, Text, Button, HStack, Image, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { uploadToCloudinary } from '../utils'
import { useNavigate } from 'react-router-dom'
import * as ArticleService from '../services/ArticleService'
import { useMutationHooks } from '../hooks/useMutationHook'
import { useMessage } from '../components/Message/Message'
import Loading from '../components/Loading/Loading'

const ArticleAdd = () => {
    const [imgDisplay, setImgDisplay] = useState('')
    const [stateArticle, setStateArticle] = useState({
        title: '',
        author: '',
        description: '',
        source: '',
        content: '',
        imageUrl: ''
    })
    const { success, error } = useMessage()
    const [isLoadingImg, setIsLoadingImg] = useState(false)

    const navigate = useNavigate()

    const mutation = useMutationHooks(async (data) => {
        const { ...rests } = data
        const res = await ArticleService.createArticle(rests)
        return res
    })

    const { data, isSuccess, isError } = mutation
    const isLoading = mutation.isPending

    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            success("Article created successfully!")
            setStateArticle({
                title: '',
                author: '',
                description: '',
                source: '',
                content: '',
                imgDisplay: ''
            })
        } else if (isError) {
            error("Failed to create article")
        }
    }, [data, isSuccess, isError])

    const handleOnChangeImgArticle = async (info) => {
        console.log('cc')

        const file = info.target.files?.[0]
        if (file) {
            setIsLoadingImg(true)
            const uploadedImageUrl = await uploadToCloudinary(file)
            setStateArticle({
                ...stateArticle,
                imageUrl: uploadedImageUrl
            })
            setImgDisplay(uploadedImageUrl)
            setIsLoadingImg(false)
        }
    }

    const handleOnchange = (e) => {
        setStateArticle({
            ...stateArticle,
            [e.target.name]: e.target.value
        })
    }

    const handleClickNav = (type) => {
        if (type === 'admin') {
            navigate('/system/admin')
        }
    }

    const createArticle = () => {
        mutation.mutate({ ...stateArticle })
    }

    const isArticleFormValid =
        stateArticle.title !== '' &&
        stateArticle.author !== '' &&
        stateArticle.source !== '' &&
        stateArticle.description !== '' &&
        stateArticle.content !== '' &&
        stateArticle.imageUrl !== ''

    return (
        <Box pt={16}>
            <Box>
                <Box p={4}>
                    <Box pb={4}>
                        <Button colorScheme='teal' onClick={() => handleClickNav('admin')}>
                            <i className="fa-solid fa-arrow-left"></i>
                            <Text as='span' pl={4}>Back</Text>
                        </Button>
                    </Box>
                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftAddon>Title</InputLeftAddon>
                            <Input placeholder='Title here' value={stateArticle.title} name="title" onChange={handleOnchange} required />
                        </InputGroup>
                        <HStack>
                            <InputGroup>
                                <InputLeftAddon>Author</InputLeftAddon>
                                <Input placeholder='Author here' value={stateArticle.author} name="author" onChange={handleOnchange} required />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon>Source</InputLeftAddon>
                                <Input placeholder='Source here' value={stateArticle.source} name="source" onChange={handleOnchange} required />
                            </InputGroup>
                        </HStack>
                        <InputGroup>
                            <InputLeftAddon>Description</InputLeftAddon>
                            <Input placeholder='Description here' value={stateArticle.description} name="description" onChange={handleOnchange} required />
                        </InputGroup>
                    </Stack>
                </Box>

                <HStack spacing={4} p={4}>
                    <Button as="label" cursor="pointer" colorScheme='orange'>
                        <i className="fa-solid fa-upload"></i>
                        <Text as="span" paddingLeft={4} display={{ base: 'none', md: 'flex' }}>Display</Text>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleOnChangeImgArticle}
                            hidden
                        />
                    </Button>
                    <Loading isLoading={isLoadingImg}>
                        <Image src={imgDisplay} objectFit="cover" h="auto" w="400px" />
                    </Loading>
                </HStack>
                <Box p={4}>
                    <Editor
                        apiKey={import.meta.env.VITE_MCE_API_KEY}
                        placeholder="<p>Nhập nội dung tại đây...</p>"
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: "advlist autolink lists link image charmap preview anchor media",
                            toolbar: "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image media",
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
                        value={stateArticle.content}
                        onEditorChange={(content) => setStateArticle({ ...stateArticle, content })}
                    />
                </Box>
            </Box>
            <Flex justify="flex-end" p={4}>
                <Button colorScheme='green' onClick={createArticle} disabled={!isArticleFormValid}>
                    <i className="fa-solid fa-plus"></i>
                    <Text as="span" paddingLeft={4}>Post</Text>
                </Button>
            </Flex>
        </Box>
    )
}

export default ArticleAdd
