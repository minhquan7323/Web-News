import { useToast } from "@chakra-ui/react"

export const useMessage = () => {
    const toast = useToast()

    const success = (mes = 'Thành công', description = '') => {
        toast({
            title: mes,
            description: description,
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    const error = (mes = 'Lỗi', description = '') => {
        toast({
            title: mes,
            description: description,
            status: "error",
            duration: 3000,
            isClosable: true,
        })
    }

    const warning = (mes = 'Cảnh báo', description = '') => {
        toast({
            title: mes,
            description: description,
            status: "warning",
            duration: 3000,
            isClosable: true,
        })
    }
    return { success, error, warning }
}
