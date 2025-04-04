import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react"
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const BreadcrumbNav = ({ categories, currentCategory, parentCategory, title }) => {
    // Kiểm tra nếu currentCategory và parentCategory là cùng một category
    const isSameCategory = currentCategory && parentCategory && currentCategory._id === parentCategory._id;

    return (
        <Breadcrumb spacing='8px' py={4} separator={<ChevronRightIcon color='gray.500' />}>
            <BreadcrumbItem>
                <Link to='/'><Text as='b'>Home</Text></Link>
            </BreadcrumbItem>

            {/* Chỉ hiển thị parentCategory nếu nó khác với currentCategory */}
            {parentCategory && !isSameCategory && (
                <BreadcrumbItem>
                    <Link to={`/type/${parentCategory._id}`}>
                        <Text>{parentCategory.name}</Text>
                    </Link>
                </BreadcrumbItem>
            )}

            {/* Hiển thị currentCategory nếu có */}
            {currentCategory && (
                <BreadcrumbItem>
                    <Link to={`/type/${currentCategory._id}`}>
                        <Text>{currentCategory.name}</Text>
                    </Link>
                </BreadcrumbItem>
            )}

            {title && (
                <BreadcrumbItem isCurrentPage>
                    <Text>{title}</Text>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    )
}

export default BreadcrumbNav 