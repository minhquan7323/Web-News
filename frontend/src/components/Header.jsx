import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, List, ListItem, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const [isScrolled, setIsScrolled] = useState(false)
    const [movieSearch, setMovieSearch] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    return (
        <>
            <Box
                display="flex"
                position="fixed"
                justifyContent="space-between"
                alignItems="center"
                bg={isScrolled ? '#1a202c' : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0))'}
                w="100%"
                p="5px 10px"
                shadow={isScrolled ? '0 0 10px 1px rgba(0, 0, 0, 0.13)' : 'none'}
                transition="background-color 0.3s ease, box-shadow 0.3s ease"
                zIndex="1002"
            >

                <Box display="flex" alignItems="center">
                    <Button variant='ghost' display={{ base: 'flex', sm: 'none' }} onClick={onOpen} m='7px'>
                        <HamburgerIcon boxSize={6} color='teal' />
                    </Button>
                    <Link to="/">
                        <Text
                            display={{ base: 'none', sm: 'flex' }}
                            fontSize='4xl' color='teal'
                            fontWeight='bold'
                            textTransform='uppercase' px={2}
                        >
                            Movie
                        </Text>
                    </Link>
                    <Link to="/favorite">
                        <Text _hover={{ textDecoration: "none" }} display={{ base: 'none', sm: 'flex' }} px={4} >
                            Favorite List
                        </Text>
                    </Link>
                </Box>

                <Box display="flex" alignItems="center">
                    <Button m='7px'>
                        Sign in
                    </Button>
                </Box>
            </Box>

            <Drawer onClose={onClose} isOpen={isOpen} size='full'>
                <DrawerOverlay />
                <DrawerContent bg="#1a202c">
                    <DrawerCloseButton color='teal' />
                    <DrawerHeader>
                        <Link to="/">
                            <Text fontSize='4xl' color='teal' fontWeight='bold' textTransform='uppercase' px={4} onClick={onClose}>
                                Movie
                            </Text>
                        </Link>
                    </DrawerHeader>

                    <Divider borderColor="teal" />

                    <DrawerBody>
                        <Box display="flex" alignItems="center" py={10}>
                            <Input
                                placeholder='Search'
                                mr={2}
                                color='white'
                                value={movieSearch}
                                onChange={(e) => setMovieSearch(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        onSearch()
                                    }
                                }}
                            />

                        </Box>

                        <Divider borderColor="teal" />

                        <VStack as="ul" spacing={4} color="white" align="start" w="full" p={10}>
                            <List spacing={4} styleType="disc">
                                <ListItem>
                                    <Link to="/favorite" onClick={onClose}>
                                        <Text _hover={{ textDecoration: "none" }} px={4} >
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
