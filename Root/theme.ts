import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const colors = {
  brand: {
    100: "#ffae00",
    900: "#ccaa00",
  },
}

const styles = {
  global: {
    // styles for the `body`
    body: {
      bg: "gray.400",
      color: "white",
    },
    // styles for the `a`
    a: {
      color: "teal.500",
      _hover: {
        textDecoration: "underline",
      },
    },
  },
}

const config : ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({ config, colors })

export default theme