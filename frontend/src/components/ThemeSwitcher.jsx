import { Button, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitcher = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Button
            size="sm"
            onClick={toggleColorMode}
            color={colorMode === "dark" ? "white" : "#4C585B"}
            _hover={{
                backgroundColor: colorMode === "dark" ? "#3a4648" : "#f0f0f0",
            }}
        >
            {colorMode === "dark" ? <FaSun /> : <FaMoon />}
        </Button>
    );
};

export default ThemeSwitcher;


// import { Button, useColorMode } from "@chakra-ui/react"
// import { useState, useEffect } from "react"
// import { ConfigProvider, theme as antdTheme } from "antd"

// const ThemeSwitcher = () => {
//     const { colorMode, toggleColorMode } = useColorMode()
//     const [antdMode, setAntdMode] = useState("light")

//     useEffect(() => {
//         setAntdMode(colorMode === "dark" ? "dark" : "light")
//     }, [colorMode])

//     return (
//         <ConfigProvider
//             theme={{
//                 algorithm: antdMode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
//                 components: {
//                     Table: {
//                         headerBg: antdMode === "dark" ? "#455A64" : "#f0f0f0", // Màu header
//                         rowHoverBg: antdMode === "dark" ? "#546E7A" : "#e6f7ff", // Màu hover row
//                         borderColor: antdMode === "dark" ? "#78909C" : "#d9d9d9", // Viền
//                         colorText: antdMode === "dark" ? "#ffffff" : "#000000", // Màu chữ
//                         colorBgContainer: antdMode === "dark" ? "#37474F" : "#ffffff", // Background table
//                     },
//                 },
//             }}
//         >
//             <Button onClick={toggleColorMode} colorScheme={colorMode === "dark" ? "yellow" : "blue"}>
//                 {colorMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
//             </Button>
//         </ConfigProvider>
//     )
// }

// export default ThemeSwitcher
