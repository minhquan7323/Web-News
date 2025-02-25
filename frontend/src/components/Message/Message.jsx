import { useToast } from "@chakra-ui/react"

export const useMessage = () => {
    const toast = useToast()

    const success = (mes = 'Success') => {
        toast({
            title: mes,
            status: "success",
            duration: 3000,
            isClosable: true,
        })
    }

    const error = (mes = 'Error') => {
        toast({
            title: mes,
            status: "error",
            duration: 3000,
            isClosable: true,
        })
    }

    return { success, error }
}
