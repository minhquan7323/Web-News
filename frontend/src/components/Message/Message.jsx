import { useToast } from "@chakra-ui/react"

export const useMessage = () => {
    const toast = useToast()

    const success = (mes = 'Success', description = '') => {
        toast({
            title: mes,
            description: description,
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    const error = (mes = 'Error', description = '') => {
        toast({
            title: mes,
            description: description,
            status: "error",
            duration: 3000,
            isClosable: true,
        })
    }

    return { success, error }
}
