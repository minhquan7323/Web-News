import React from 'react'
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel, Text } from '@chakra-ui/react'
import ArticleManagement from './Admin/ArticleManagement'
import CategoryManagement from './Admin/CategoryManagement'
import UserManagement from './Admin/UserManagement'
import CommentManagement from './Admin/CommentManagement'
const Admin = () => {
    return (
        <Box pt={16}>
            <Tabs isManual isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab><Text as='b'>Article</Text></Tab>
                    <Tab><Text as='b'>Category</Text></Tab>
                    <Tab><Text as='b'>User</Text></Tab>
                    <Tab><Text as='b'>Comment</Text></Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ArticleManagement />
                    </TabPanel>
                    <TabPanel>
                        <CategoryManagement />
                    </TabPanel>
                    <TabPanel>
                        <UserManagement />
                    </TabPanel>
                    <TabPanel>
                        <CommentManagement />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Admin
