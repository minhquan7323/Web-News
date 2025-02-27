import { Box, Input, InputLeftAddon, InputGroup, Stack, Text, Button, HStack, Image, Flex, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Editor } from "@tinymce/tinymce-react"
import { uploadToCloudinary } from '../../utils'
import { useNavigate, useParams } from 'react-router-dom'
import * as ArticleService from '../../services/ArticleService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { useMessage } from '../../components/Message/Message'
import Loading from '../../components/Loading/Loading'

const ArticleUpdate = () => {
    const { id: articleId } = useParams()
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

    const handleOnChangeImgArticle = async (info) => {
        const file = info.target.files?.[0]
        if (file) {
            setIsLoadingImg(true)
            const uploadedImageUrl = await uploadToCloudinary(file)
            setStateArticle({
                ...stateArticle,
                imageUrl: uploadedImageUrl
            })
            setIsLoadingImg(false)
        }
    }

    const handleOnchangeDetails = (e) => {
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

    const fetchGetDetailsArticle = async () => {
        const res = await ArticleService.getDetailsArticle(articleId)
        if (res.data) {
            setStateArticle({
                title: res.data.title,
                author: res.data.author,
                description: res.data.description,
                source: res.data.source,
                content: res.data.content,
                imageUrl: res.data.imageUrl
            })
        }
    }
    useEffect(() => {
        fetchGetDetailsArticle()
    }, [])

    const mutationUpdate = useMutationHooks(
        async (data) => {
            const { id, ...rests } = data
            const res = await ArticleService.updateArticle(id, rests)
            return res
        }
    )
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
    const isLoadingUpdated = mutationUpdate.isPending

    const updateArticle = () => {
        mutationUpdate.mutate({
            id: articleId,
            ...stateArticle
        })
    }

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            success()
            handleClickNav('admin')
        } else if (isErrorUpdated) {
            error()
        }
    }, [dataUpdated, isSuccessUpdated, isErrorUpdated])

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
                            <Input placeholder='Title here' value={stateArticle.title} name="title" onChange={handleOnchangeDetails} required />
                        </InputGroup>
                        <HStack>
                            <InputGroup>
                                <InputLeftAddon>Author</InputLeftAddon>
                                <Input placeholder='Author here' value={stateArticle.author} name="author" onChange={handleOnchangeDetails} required />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon>Source</InputLeftAddon>
                                <Input placeholder='Source here' value={stateArticle.source} name="source" onChange={handleOnchangeDetails} required />
                            </InputGroup>
                        </HStack>
                        <Box>
                            <Text p={2}>Description</Text>
                            <Textarea placeholder='Description here' value={stateArticle.description} name="description" onChange={handleOnchangeDetails} required />
                        </Box>
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
                        <Image src={stateArticle.imageUrl} objectFit="cover" h="auto" w="400px" />
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
                <Button colorScheme='green' onClick={updateArticle} disabled={!isArticleFormValid}>
                    <i className="fa-solid fa-upload"></i>
                    <Text as="span" paddingLeft={4}>Update</Text>
                </Button>
            </Flex>
        </Box>
    )
}

export default ArticleUpdate
