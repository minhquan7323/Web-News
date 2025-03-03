import {
    Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton,
    DrawerContent, DrawerHeader, DrawerOverlay, HStack, Input,
    List, ListItem, Text, useBreakpointValue, useDisclosure, VStack
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUser, SignedIn, SignedOut, useAuth, SignInButton, UserButton } from "@clerk/clerk-react"
import Logo from './Logo'
import * as UserService from '../services/UserService'
import * as CategoryService from '../services/CategoryService'
import { useQuery } from '@tanstack/react-query'

const Header = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [isScrolled, setIsScrolled] = useState(false)
    const [newsSearch, setNewsSearch] = useState('')
    const navigate = useNavigate()
    const { user } = useUser()
    const { signOut } = useAuth()
    const [isAdmin, setIsAdmin] = useState(false)
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

    const handleGetDetailsUser = async (userId) => {
        const res = await UserService.getDetailsUser(userId)
        setIsAdmin(res.data.isAdmin)
    }

    useEffect(() => {
        if (user) {
            handleGetDetailsUser(user.id)
            if (!user) {
                window.FB?.getLoginStatus((response) => {
                    if (response.status !== "connected") {
                        window.FB.login()
                    }
                })
            }
        }
    }, [user])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [location.pathname])

    const handleLogout = async () => {
        await signOut()

        if (window.FB) {
            window.FB.getLoginStatus((response) => {
                if (response.status === "connected") {
                    window.FB.logout(() => {
                        localStorage.removeItem('fblo_:appId')
                        setTimeout(() => window.FB.XFBML.parse(), 1000)
                    })
                }
            })
        }

        setTimeout(() => {
            window.location.reload()
        }, 1500)
    }

    const fetchAllCategory = async () => {
        const res = await CategoryService.getAllCategory()
        return res.data
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
                bg="rgba(255, 255, 255, 0.3)"
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
                            {categories?.slice(0, visibleCategories).map((category) => (
                                <Link to="/" key={category._id}>
                                    <Text
                                        transition="color 0.3s ease"
                                        _hover={{ textDecoration: "none" }}
                                        fontWeight="bold"
                                        display={{ base: 'none', sm: 'flex' }}
                                        px={4}
                                    >
                                        {category.name}
                                    </Text>
                                </Link>
                            ))}
                        </HStack>
                    )}
                </Box>

                <Box display="flex" alignItems="center">
                    {!adminPath ? (
                        <>
                            <Button colorScheme="teal" size="md" onClick={onOpen} marginRight={5}>
                                <i className="fas fa-magnifying-glass"></i>
                            </Button>
                            {isAdmin && (
                                <Button colorScheme="teal" size="md" marginRight={5} onClick={() => handleClickNav('admin')}>
                                    Admin
                                </Button>
                            )}
                        </>
                    ) : (
                        <Button colorScheme="teal" size="md" marginRight={5} onClick={() => handleClickNav('home')}>
                            Home
                        </Button>
                    )}
                    <Box p={2}>
                        <SignedOut onClick={handleLogout}>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton appearance={{ elements: { avatarBox: { width: "40px", height: "40px" } } }} />
                        </SignedIn>
                    </Box>
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

                        <VStack as="ul" spacing={4} align="start" w="full" p={10}>
                            <List spacing={4} styleType="disc">
                                <ListItem>
                                    <Link to="/favorite" onClick={onClose}>
                                        <Text _hover={{ textDecoration: "none" }} px={4}>
                                            Favorite List
                                        </Text>
                                    </Link>
                                </ListItem>
                            </List>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header
