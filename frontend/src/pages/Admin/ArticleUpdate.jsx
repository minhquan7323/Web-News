import { Box, Input, InputLeftAddon, InputGroup, Stack, Text, Button, HStack, Image, Flex, Textarea, Grid, Checkbox, useBreakpointValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { uploadToCloudinary } from '../../utils'
import { useNavigate, useParams } from 'react-router-dom'
import * as ArticleService from '../../services/ArticleService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import * as CategoryService from '../../services/CategoryService'
import { useMessage } from '../../components/Message/Message'
import Loading from '../../components/Loading/Loading'
import Editor from '../../components/Editor'

const ArticleUpdate = () => {
    const { id: articleId } = useParams()
    const [stateCategory, setStateCategory] = useState([])
    const [stateArticle, setStateArticle] = useState({
        title: '',
        author: '',
        description: '',
        type: [],
        featured: '',
        source: '',
        content: '',
        imageUrl: '',
        hide: false
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
    const fetchGetDetailsArticle = async () => {
        const res = await ArticleService.getDetailsArticle(articleId)
        if (res.data) {
            setStateArticle({
                title: res.data.title,
                author: res.data.author,
                description: res.data.description,
                source: res.data.source,
                type: res.data.type.map(t => t._id),
                content: res.data.content,
                featured: res.data.featured,
                imageUrl: res.data.imageUrl,
                hide: res.data.hide
            })
        }
    }
    const fetchAllCategory = async () => {
        const res = await CategoryService.getAllCategory()
        setStateCategory(res.data)
        return res
    }

    useEffect(() => {
        fetchGetDetailsArticle()
        fetchAllCategory()
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

    const isLeafCategory = (categoryId) => {
        return !stateCategory.some(cat => cat.parentId === categoryId)
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

    const gridTemplate = useBreakpointValue({
        base: "1fr",
        sm: "1fr",
        md: "1fr",
        lg: "9fr 3fr",
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
                            <Input placeholder='Nhập tiêu đề' value={stateArticle.title} name="title" onChange={handleOnchangeDetails} required />
                        </InputGroup>
                        <HStack>
                            <InputGroup>
                                <InputLeftAddon>Tác giả</InputLeftAddon>
                                <Input placeholder='Nhập tác giả' value={stateArticle.author} name="author" disabled required />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon>Nguồn</InputLeftAddon>
                                <Input placeholder='Nhập nguồn' value={stateArticle.source} name="source" onChange={handleOnchangeDetails} required />
                            </InputGroup>
                        </HStack>
                        <Box>
                            <Text p={2} fontWeight='bold'>Mô tả</Text>
                            <Textarea placeholder='Nhập mô tả' value={stateArticle.description} name="description" onChange={handleOnchangeDetails} required />
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
                                    isChecked={stateArticle.type.includes(type._id)}
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
                        <Image src={stateArticle.imageUrl} objectFit="cover" h="auto" w="400px" />
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
                <Button colorScheme='green' onClick={updateArticle} disabled={!isArticleFormValid}>
                    <i className="fa-solid fa-upload"></i>
                    <Text as="span" paddingLeft={4}>Cập nhật</Text>
                </Button>
            </Flex>
        </Box>
    )
}

export default ArticleUpdate
