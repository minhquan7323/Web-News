import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, List, ListItem, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import Logo from './Logo'
import * as UserService from '../services/UserService'

const Header = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [isScrolled, setIsScrolled] = useState(false)
    const [newsSearch, setNewsSearch] = useState([])
    const navigate = useNavigate()
    const { user } = useUser()
    const [isAdmin, setIsAdmin] = useState('')
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleClickNav = (type) => {
        if (type === 'admin') {
            navigate('/system/admin')
        } else if (type === 'home') {
            navigate('/')
        }
    }
    const adminPath = useLocation().pathname.startsWith('/system/admin')

    const onSearch = () => {
        if (newsSearch.trim()) {
            navigate('/search', { state: { query: newsSearch } })
            setNewsSearch('')
            onClose()
        }
    }

    const handleSignIn = async (userId) => {
        if (userId) {
            const res = await UserService.signInUser(userId)
            return res
        }
    }

    const handleGetDetailsUser = async (userId) => {
        const res = await UserService.getDetailsUser(userId)
        setIsAdmin(res.data.isAdmin)
        return res
    }

    useEffect(() => {
        if (user) {
            handleSignIn(user.id)
            handleGetDetailsUser(user.id)
        }
    }, [user])

    const validSearch = newsSearch != ''
    return (
        <>
            <Box
                display="flex"
                position="fixed"
                justifyContent="space-between"
                alignItems="center"
                bg={isScrolled ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.3)'}
                backdropFilter="blur(20px)" // Làm mờ nền
                w="100%"
                p="5px 10px"
                shadow={'0 0 10px 1px rgba(0, 0, 0, 0.2)'}
                zIndex="1002"
            >

                <Box display="flex" alignItems="center">
                    <Button variant="ghost" display={{ base: "flex", sm: "none" }} onClick={onOpen} m="7px">
                        <HamburgerIcon boxSize={8} color="teal" />
                    </Button>

                    <Link to="/">
                        <Logo logo='news' />
                    </Link>
                    {!adminPath ? (
                        <Link to="/favorite">
                            <Text
                                transition="color 0.3s ease" _hover={{ textDecoration: "none" }} fontWeight='bold' display={{ base: 'none', sm: 'flex' }} px={4} >
                                Favorite List
                            </Text>
                        </Link>
                    ) : (null)}
                </Box>



                <Box display="flex" alignItems="center">
                    {!adminPath ? (
                        <>
                            <Button colorScheme="teal" size="md" onClick={onOpen} marginRight={5}>
                                <i className="fas fa-magnifying-glass"></i>
                            </Button>
                            {isAdmin ? (
                                <Button colorScheme="teal" size="md" marginRight={5} onClick={() => handleClickNav('admin')}>
                                    Admin
                                </Button>
                            ) : (null)}
                        </>

                    ) : (
                        <Button colorScheme="teal" size="md" marginRight={5} onClick={() => handleClickNav('home')}>
                            Home
                        </Button>
                    )}
                    <Box p={2}>
                        <SignedOut>
                            {/* <Button colorScheme="blue" size="md"> */}
                            <SignInButton />
                            {/* </Button> */}
                        </SignedOut>
                        <SignedIn>
                            <UserButton appearance={{ elements: { avatarBox: { width: "40px", height: "40px" } } }} />
                        </SignedIn>

                    </Box>
                </Box>
            </Box>

            <Drawer onClose={onClose} isOpen={isOpen} size='full'>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton color='teal' />
                    <DrawerHeader>
                        <Link to="/">
                            <Text fontSize='4xl' color='teal' fontWeight='bold' textTransform='uppercase' px={4} onClick={onClose}>
                                NEWS
                            </Text>
                        </Link>
                    </DrawerHeader>

                    <Divider borderColor="teal" />

                    <DrawerBody>
                        <Box display="flex" alignItems="center" py={10}>
                            <Input
                                placeholder='Search'
                                mr={2}
                                color='teal'
                                value={newsSearch}
                                onChange={(e) => setNewsSearch(e.target.value)}
                                onKeyDown={(k) => {
                                    if (k.key === "Enter") {
                                        onSearch()
                                    }
                                }}
                            />
                            <Button colorScheme='teal' size='md' onClick={onSearch} disabled={!validSearch}>
                                <i className="fas fa-magnifying-glass"></i>
                            </Button>
                        </Box>

                        <Divider borderColor="teal" />

                        <VStack as="ul" spacing={4} align="start" w="full" p={10}>
                            <List spacing={4} styleType="disc">
                                <ListItem>
                                    <Link to="/favorite" onClick={onClose} color="inherit">
                                        <Text
                                            _hover={{ textDecoration: "none" }}
                                            px={4}
                                        >
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
