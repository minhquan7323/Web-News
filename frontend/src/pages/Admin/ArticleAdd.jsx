import { Box, Input, InputLeftAddon, InputGroup, Stack, Text, Button, HStack, Image, Flex, Textarea, Checkbox, Grid, useBreakpointValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { uploadToCloudinary } from '../../utils'
import { useNavigate } from 'react-router-dom'
import * as ArticleService from '../../services/ArticleService'
import * as CategoryService from '../../services/CategoryService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { useMessage } from '../../components/Message/Message'
import Loading from '../../components/Loading/Loading'
import Editor from '../../components/Editor'
import { useSelector } from 'react-redux'
const ArticleAdd = () => {
    const [imgDisplay, setImgDisplay] = useState('')
    const user = useSelector((state) => state?.user)

    const [stateCategory, setStateCategory] = useState([])
    const [stateArticle, setStateArticle] = useState({
        title: '',
        author: user.fullName,
        description: '',
        source: '',
        content: '',
        featured: false,
        imageUrl: '',
        type: [],
        hide: false
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
            success("Bài viết đã được tạo thành công!")
            setStateArticle(prev => ({
                ...prev,
                title: '',
                author: user.fullName,
                description: '',
                source: '',
                content: '',
                featured: false,
                imageUrl: '',
                type: [],
                hide: false
            }))
            setImgDisplay('')
        } else if (isError) {
            error("Không tạo được bài viết")
        }
    }, [data, isSuccess, isError])

    const handleOnChangeImgArticle = async (info) => {
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

    const handleCheckboxChange = (type) => {
        setStateArticle((prev) => {
            const isChecked = prev.type.includes(type)
            const newTypes = isChecked
                ? prev.type.filter(t => t !== type)
                : [...prev.type, type]
            return { ...prev, type: newTypes }
        })
    }

    const handleCheckboxFeaturedChange = () => {
        setStateArticle((prev) => ({
            ...prev,
            featured: !prev.featured
        }))
    }

    const handleCheckboxHideChange = () => {
        setStateArticle((prev) => ({
            ...prev,
            hide: !prev.hide
        }))
    }
    const createArticle = () => {
        mutation.mutate({ ...stateArticle })
    }

    const fetchAllCategory = async () => {
        const res = await CategoryService.getAllCategory()
        setStateCategory(res.data)
        return res
    }

    const isLeafCategory = (categoryId) => {
        return !stateCategory.some(cat => cat.parentId === categoryId)
    }

    useEffect(() => {
        fetchAllCategory()
    }, [])

    const isArticleFormValid =
        stateArticle.title !== '' &&
        stateArticle.source !== '' &&
        stateArticle.description !== '' &&
        stateArticle.content !== '' &&
        stateArticle.imageUrl !== '' &&
        stateArticle.type.length > 0

    const gridTemplate = useBreakpointValue({
        base: "1fr 1fr",
        sm: "1fr 1fr",
        md: "1fr 1fr 1fr",
        lg: "1fr 1fr 1fr",
    })

    return (
        <Box pt={16}>
            <Box>
                <Box p={4}>
                    <Box pb={4}>
                        <Button colorScheme='teal' onClick={() => handleClickNav('admin')}>
                            <i className="fa-solid fa-arrow-left"></i>
                            <Text as='span' pl={4}>Quay lại</Text>
                        </Button>
                    </Box>
                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftAddon>Tiêu đề</InputLeftAddon>
                            <Input placeholder='Nhập tiêu đề' value={stateArticle.title} name="title" onChange={handleOnchange} required />
                        </InputGroup>
                        <HStack>
                            {/* <InputGroup>
                                <InputLeftAddon>Tác giả</InputLeftAddon>
                                <Input placeholder='Nhập tác giả' value={stateArticle.author} name="author" disabled required />
                            </InputGroup> */}
                            <InputGroup>
                                <InputLeftAddon>Nguồn</InputLeftAddon>
                                <Input placeholder='Nhập nguồn' value={stateArticle.source} name="source" onChange={handleOnchange} required />
                            </InputGroup>
                        </HStack>
                        <Box>
                            <Text p={2} fontWeight='bold'>Mô tả</Text>
                            <Textarea placeholder='Nhập mô tả' value={stateArticle.description} name="description" onChange={handleOnchange} required />
                        </Box>
                    </Stack>
                </Box>
                <Box p={4}>
                    <Text p={2} fontWeight='bold'>Danh mục</Text>
                    <Grid templateColumns={gridTemplate} gap={2}>
                        {stateCategory?.filter(type => isLeafCategory(type._id)).map((type) => (
                            <Box key={type._id} display="flex" alignItems="center" gap={4}>
                                <Checkbox
                                    id={`type-${type._id}`}
                                    name="type"
                                    value={type._id}
                                    className="form-check-input"
                                    isChecked={stateArticle?.type.includes(type._id)}
                                    onChange={() => handleCheckboxChange(type._id)}
                                />
                                <Text as='span' htmlFor={`type-${type._id}`}>
                                    {type.name}
                                </Text>
                            </Box>
                        ))}
                    </Grid>
                </Box>
                <HStack p={4}>
                    <Text p={2} fontWeight='bold'>Nổi bật</Text>
                    <Checkbox
                        name="featured"
                        isChecked={stateArticle.featured}
                        onChange={handleCheckboxFeaturedChange}
                    />
                    <Text p={2} fontWeight='bold'>Ẩn</Text>
                    <Checkbox
                        name="hide"
                        isChecked={stateArticle.hide}
                        onChange={handleCheckboxHideChange}
                    />
                </HStack>
                <HStack spacing={4} p={4}>
                    <Button as="label" cursor="pointer" colorScheme='orange'>
                        <i className="fa-solid fa-upload"></i>
                        <Text as="span" paddingLeft={4} display={{ base: 'none', md: 'flex' }}>Ảnh hiển thị</Text>
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
                        value={stateArticle.content}
                        onChange={(content) => setStateArticle({ ...stateArticle, content })}
                    />
                </Box>
            </Box>
            <Flex justify="flex-end" p={4}>
                <Button colorScheme='green' onClick={createArticle} disabled={!isArticleFormValid}>
                    <i className="fa-solid fa-plus"></i>
                    <Text as="span" paddingLeft={4}>Đăng</Text>
                </Button>
            </Flex>
        </Box>
    )
}

export default ArticleAdd
