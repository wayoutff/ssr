import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button, Box, IconButton, useColorMode, useToast } from "@chakra-ui/react"

import { setLocale, counterIncrement } from '../../store/app/actions'
import { getCounter } from '../../store/app/selectors'
import { Locale } from '../../store/app/types'
import Features from '../../components/Features'

import { MoonIcon, SunIcon } from '@chakra-ui/icons'

import axios from 'axios'

const Home: React.FC<any> = () => {
  const { t } = useTranslation()
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()
  const counter = useSelector(getCounter)
  const dispatch = useDispatch()
  const handleLocaleChange = useCallback(
    (e: React.FormEvent<HTMLButtonElement>) => {
      dispatch(setLocale(e.currentTarget.value as Locale))
    },
    [dispatch]
  )

  const handleCount = () => {
    dispatch(counterIncrement())
  }

  async function handleCreateDoc () {
    await axios.post('/api/create-doc')
  }

  return (
    <React.Fragment>
      {/* <Features /> */}
      <IconButton
        variant="outline"
        onClick={toggleColorMode}
        aria-label="Call Sage"
        fontSize="20px"
        icon={colorMode === 'light' ? <MoonIcon w={6} h={6} /> : <SunIcon w={6} h={6} />}
      />
      <Box bg="brand.900">Welcome</Box>
      <Button colorScheme="brand">Click me</Button>
      <Button
        onClick={() =>
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 500,
            isClosable: true,
          })
        }
      >
        Show Toast
      </Button>
      <h1>{counter}</h1>
      <h2>{t('i18n-example')}</h2>
      <p>
        <button value="de_DE" onClick={handleLocaleChange}>
          Deutsch 
        </button>
        <button value="en_US" onClick={handleLocaleChange}>
          English 
        </button>
        <button value="en_US" onClick={handleCount}>
          test
        </button>

        <button value="en_US" onClick={handleCreateDoc}>
          handle create doc
        </button>
      </p>
    </React.Fragment>
  )
}

export default Home
