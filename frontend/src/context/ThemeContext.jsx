import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    config: {
        initialColorMode: "light",
        useSystemColorMode: false,
    },
    styles: {
        global: (props) => ({
            "html, body": {
                background: props.colorMode === "dark" ? "#4C585B" : "white",
                color: props.colorMode === "dark" ? "white" : "black",
                transition: "background 0.3s ease",
            },
        }),
    },
})

export default theme