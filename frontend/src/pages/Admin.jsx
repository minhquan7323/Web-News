import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useState } from 'react';

const Admin = () => {
    const colors = useColorModeValue(
        ['red.100', 'teal.100', 'blue.100'], // Màu sáng
        ['red.700', 'teal.700', 'blue.700']  // Màu tối
    );
    const [tabIndex, setTabIndex] = useState(0);
    const bg = colors[tabIndex]
    return (
        <Box pt={16}>
            <Tabs align="center" isManual variant="unstyled" onChange={(index) => setTabIndex(index)}>
                <TabList>
                    {['One', 'Two', 'Three'].map((label, index) => (
                        <Tab
                            key={index}
                            fontWeight="bold"
                            transition="background 0.4s ease-in-out"
                            bg={tabIndex === index ? colors[index] : 'transparent'} // Chỉ tab đang mở có màu
                            _selected={{
                                color: 'white',
                                bg: colors[index],
                            }}
                            px={6}
                            py={2}
                            borderTopRadius="md"
                        >
                            {label}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels transition="background 0.4s ease-in-out" bg={bg}>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Admin;
