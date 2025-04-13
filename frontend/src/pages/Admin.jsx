import React from 'react'
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel, Text } from '@chakra-ui/react'
import ArticleManagement from './Admin/ArticleManagement'
import CategoryManagement from './Admin/CategoryManagement'
import UserManagement from './Admin/UserManagement'
import CommentManagement from './Admin/CommentManagement'
import Dashboard from '../components/Dashboard'

const Admin = () => {
    return (
        <Box pt={16}>
            <Dashboard />
            <Tabs isManual isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab><Text as='b'>Bài báo</Text></Tab>
                    <Tab><Text as='b'>Danh mục</Text></Tab>
                    <Tab><Text as='b'>Người dùng</Text></Tab>
                    <Tab><Text as='b'>Bình luận</Text></Tab>
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
