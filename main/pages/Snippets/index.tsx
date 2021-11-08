import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Divider,
  Button,
  Box,
  IconButton,
  useColorMode,
  SimpleGrid,
  useToast
} from "@chakra-ui/react"
import { setLocale, counterIncrement } from '../../store/app/actions'
import { getCounter, getUser } from '../../store/app/selectors'
import { Locale } from '../../store/app/types'
import Features from '../../components/Features'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import axios from 'axios'
import './index.css'

declare const pug: any

import Dashboard from '../../components/Dashboard'

const Home: React.FC<any> = () => {
  const { t } = useTranslation()
  // const [text, setText] = useState<string>('')
  // const [parsed, setParsed] = useState([])
  // const toast = useToast()
  // const { colorMode, toggleColorMode } = useColorMode()
  // const counter = useSelector(getCounter)
  // const cUser = useSelector(getUser)
  // const dispatch = useDispatch()

  const arr = [
    {
      title: 'test snippet',
      description: 'test description'
    }
  ]

  return pug`
    div.about
      div.titling
        p.name Code Snippets
        p.description These are a collection of code snippets I've used in the past and saved. Some are Serverless Functions, which include set up instructions. Others are anything from random CSS snippets to Node.js scripts.
    SimpleGrid(columns=2 spacing=5)
      each item in arr
        Box(key=item.title as="button" maxW="lg" borderWidth="1px" display="flex" alignItems="flex-start" justifyContent='flex-start' borderRadius="lg" overflow="hidden")
          div.card
            p.cardTitle= item.title
            p.cardDescription= item.description
    `
}

export default Home
