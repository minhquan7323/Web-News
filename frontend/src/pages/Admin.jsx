import React from 'react'
import { Box, Tabs, TabList, Tab, TabPanels, TabPanel, Text } from '@chakra-ui/react'
import ArticleManagement from './Admin/ArticleManagement'
import CategoryManagement from './Admin/CategoryManagement'

const Admin = () => {
    return (
        <Box pt={16}>
            <Tabs isManual isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab><Text as='b'>Article Management</Text></Tab>
                    <Tab><Text as='b'>Category Management</Text></Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ArticleManagement />
                    </TabPanel>
                    <TabPanel>
                        <CategoryManagement />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Admin
