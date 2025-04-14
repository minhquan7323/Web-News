import {
    Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton,
    DrawerContent, DrawerHeader, DrawerOverlay, HStack, Input,
    Text, useBreakpointValue, useDisclosure
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUser, SignedIn, SignedOut, useAuth, SignInButton, UserButton } from "@clerk/clerk-react"
import Logo from './Logo'
import * as UserService from '../services/UserService'
import * as CategoryService from '../services/CategoryService'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser, updateUser } from '../redux/userSlice'
import { persistor } from '../redux/store'
import ThemeSwitcher from './ThemeSwitcher'

const Header = () => {
    const user = useSelector((state) => state?.user)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [isScrolled, setIsScrolled] = useState(false)
    const [newsSearch, setNewsSearch] = useState('')
    const navigate = useNavigate()
    const { user: userClerk } = useUser()
    const dispatch = useDispatch()
    const { signOut } = useAuth()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleClickNav = (type) => navigate(type === 'admin' ? '/system/admin' : '/')

    const adminPath = location.pathname.startsWith('/system/admin')

    const onSearch = () => {
        if (newsSearch?.trim()) {
            navigate('/search', { state: { query: newsSearch } })
            setNewsSearch('')
            onClose()
        }
    }

    const handleLoginWithAPI = async (userClerk) => {
        if (!userClerk) return

        const data = {
            userId: userClerk.id,
            fullName: userClerk.fullName,
            imageUrl: userClerk.imageUrl
        }

        const res = await UserService.signInUser(data)

        if (res && res.user) {
            dispatch(updateUser({
                userId: res.user.userId,
                fullName: res.user.fullName,
                imageUrl: res.user.imageUrl,
                isAdmin: res.user.isAdmin,
                isSuperAdmin: res.user.isSuperAdmin,
                isBanned: res.user.isBanned
            }))
        }
    }

    useEffect(() => {
        if (userClerk) {
            handleLoginWithAPI(userClerk)
        }
    }, [userClerk])


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [location.pathname])

    const handleLogout = async () => {
        dispatch(resetUser())

        await signOut()

        persistor.pause()
        persistor.flush().then(() => {
            persistor.purge()
        })

        localStorage.removeItem('persist:root')
        sessionStorage.clear()

        setTimeout(() => {
            window.location.reload()
        }, 500)
    }

    const fetchAllCategory = async () => {
        const res = await CategoryService.getAllCategory()
        return res.data
    }
    const handleTypeArticle = (typeId) => {
        navigate(`/type/${typeId}`)
        onClose()
    }

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchAllCategory,
        retry: 2,
        retryDelay: 1000
    })

    const visibleCategories = useBreakpointValue({ base: 2, sm: 2, md: 3, lg: 5 })
    return (
        <>
            <Box
                display="flex"
                position="fixed"
                justifyContent="space-between"
                alignItems="center"
                backdropFilter="blur(20px)"
                w="100%"
                p="5px 10px"
                shadow="0 0 10px 1px rgba(0, 0, 0, 0.2)"
                zIndex="1002"
            >
                <Box display="flex" alignItems="center">
                    <Button variant="ghost" display={{ base: "flex", sm: "none" }} onClick={onOpen} m="7px">
                        <HamburgerIcon boxSize={8} color="teal" />
                    </Button>

                    <Link to="/">
                        <Logo logo="news" />
                    </Link>
                    {!adminPath && (
                        <HStack>
                            {categories?.filter(category => !category.parentId).slice(0, visibleCategories).map((category) => (
                                <Box cursor='pointer' onClick={() => handleTypeArticle(category._id)} key={category._id}>
                                    <Text
                                        transition="color 0.3s ease"
                                        _hover={{ textDecoration: "underline" }}
                                        fontWeight="bold"
                                        display={{ base: 'none', sm: 'flex' }}
                                        px={4}
                                    >
                                        {category.name}
                                    </Text>
                                </Box>
                            ))}
                            {user?.userId && (
                                <Box cursor='pointer' onClick={() => navigate('/watch-later')}>
                                    <Text
                                        transition="color 0.3s ease"
                                        _hover={{ textDecoration: "underline" }}
                                        fontWeight="bold"
                                        display={{ base: 'none', sm: 'flex' }}
                                        px={4}
                                    >
                                        Xem sau
                                    </Text>
                                </Box>
                            )}
                        </HStack>
                    )}
                </Box>

                <Box display="flex" alignItems="center">
                    {!adminPath ? (
                        <>
                            <Box display={{ base: 'none', sm: 'flex' }}>
                                <Button colorScheme="teal" size="md" onClick={onOpen} marginRight={5}>
                                    <i className="fas fa-magnifying-glass"></i>
                                </Button>
                            </Box>
                            {user.isAdmin && (
                                <Button colorScheme="teal" size="md" onClick={() => handleClickNav('admin')}>
                                    Admin
                                </Button>
                            )}
                        </>
                    ) : (
                        <Button colorScheme="teal" size="md" onClick={() => handleClickNav('home')}>
                            Trang chủ
                        </Button>
                    )}
                    <Box p={2}>
                        <SignedOut onClick={() => handleLogout()}>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton appearance={{ elements: { avatarBox: { width: "40px", height: "40px" } } }} />
                        </SignedIn>
                    </Box>
                    <ThemeSwitcher />
                </Box>
            </Box>

            <Drawer onClose={onClose} isOpen={isOpen} size="full">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton color="teal" />
                    <DrawerHeader>
                        <Link to="/">
                            <Text
                                fontSize="4xl"
                                color="teal"
                                fontWeight="bold"
                                textTransform="uppercase"
                                px={4}
                                onClick={onClose}
                            >
                                NEWS
                            </Text>
                        </Link>
                    </DrawerHeader>

                    <Divider borderColor="teal" />

                    <DrawerBody>
                        <Box display="flex" alignItems="center" py={10}>
                            <Input
                                placeholder="Search"
                                mr={2}
                                color="teal"
                                value={newsSearch}
                                onChange={(e) => setNewsSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                            />
                            <Button colorScheme="teal" size="md" onClick={onSearch} disabled={!newsSearch?.trim()}>
                                <i className="fas fa-magnifying-glass"></i>
                            </Button>
                        </Box>

                        <Divider borderColor="teal" />

                        <HStack spacing={12} pt={12} wrap="wrap" align="flex-start">
                            {categories?.filter(category => !category.parentId).map((category) => (
                                <Box key={category._id} width={{ base: "100%", md: "45%", lg: "30%" }}>
                                    <Box cursor='pointer' onClick={() => handleTypeArticle(category._id)}>
                                        <Text
                                            transition="color 0.3s ease"
                                            _hover={{ textDecoration: "underline" }}
                                            fontWeight="bold"
                                            px={4}
                                            color="teal"
                                        >
                                            {category.name}
                                        </Text>
                                    </Box>

                                    <Box pl={8} mt={2}>
                                        {categories?.filter(subCategory => subCategory.parentId === category._id).map((subCategory) => (
                                            <Box
                                                key={subCategory._id}
                                                cursor='pointer'
                                                onClick={() => handleTypeArticle(subCategory._id)}
                                                mb={2}
                                            >
                                                <Text
                                                    transition="color 0.3s ease"
                                                    _hover={{ textDecoration: "underline" }}
                                                    fontWeight="medium"
                                                    fontSize="sm"
                                                >
                                                    {subCategory.name}
                                                </Text>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            ))}
                            {user?.userId && (
                                <Box cursor='pointer' onClick={() => navigate('/watch-later')} width={{ base: "100%", md: "45%", lg: "30%" }}>
                                    <Text
                                        transition="color 0.3s ease"
                                        _hover={{ textDecoration: "underline" }}
                                        fontWeight="bold"
                                        px={4}
                                        color="teal"
                                    >
                                        Xem sau
                                    </Text>
                                </Box>
                            )}
                        </HStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header
