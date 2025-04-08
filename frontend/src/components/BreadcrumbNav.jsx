import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react"
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const BreadcrumbNav = ({ categories, currentCategory, parentCategory, title }) => {
    // Kiểm tra nếu currentCategory và parentCategory là cùng một category
    const isSameCategory = currentCategory && parentCategory && currentCategory._id === parentCategory._id;

    // Kiểm tra an toàn cho các props
    const safeCurrentCategory = currentCategory || null;
    const safeParentCategory = parentCategory || null;
    const safeTitle = title || '';

    return (
        <Breadcrumb spacing='8px' py={4} separator={<ChevronRightIcon color='gray.500' />}>
            <BreadcrumbItem>
                <Link to='/'><Text as='b'>Home</Text></Link>
            </BreadcrumbItem>

            {/* Chỉ hiển thị parentCategory nếu nó khác với currentCategory */}
            {safeParentCategory && !isSameCategory && (
                <BreadcrumbItem>
                    <Link to={`/type/${safeParentCategory._id}`}>
                        <Text >{safeParentCategory.name}</Text>
                    </Link>
                </BreadcrumbItem>
            )}

            {/* Hiển thị currentCategory nếu có */}
            {safeCurrentCategory && (
                <BreadcrumbItem>
                    <Link to={`/type/${safeCurrentCategory._id}`}>
                        <Text>{safeCurrentCategory.name}</Text>
                    </Link>
                </BreadcrumbItem>
            )}

            {safeTitle && (
                <BreadcrumbItem isCurrentPage>
                    <Text>{safeTitle}</Text>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    )
}

export default BreadcrumbNav 