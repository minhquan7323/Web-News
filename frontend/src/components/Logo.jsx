import { Text } from "@chakra-ui/react"
import React, { useState, useEffect } from "react"

const Logo = ({ logo = "", fontSize = '4xl' }) => {
    const letters = logo.toUpperCase().split("").map(char => (/\w/.test(char) ? char : "\u00A0"))

    const colors = ["#4db6ac", "#009688", "#00796b", "#004d40"]

    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % letters.length)
        }, 400)

        return () => clearInterval(interval)
    }, [letters.length])

    return (
        <Text
            display={{ base: "none", sm: "flex" }}
            fontSize={fontSize}
            fontWeight="bold"
            textTransform="uppercase"
            px={2}
        >
            {letters.map((char, index) => {
                let colorIndex = (activeIndex - index + colors.length) % colors.length

                return (
                    <Text
                        as="span"
                        key={index}
                        color={colors[colorIndex]}
                        transition="color 0.5s ease-in-out"
                    >
                        {char}
                    </Text>
                )
            })}
        </Text>
    )
}

export default Logo