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
  useToast
} from "@chakra-ui/react"
import { setLocale, counterIncrement } from '../../store/app/actions'
import { getCounter, getUser } from '../../store/app/selectors'
import { Locale } from '../../store/app/types'
import Features from '../../components/Features'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import axios from 'axios'
import './index.css'
import Test from './index.mdx'

import Dashboard from '../../components/Dashboard'

const Home: React.FC<any> = () => {
  const { t } = useTranslation()
  const [text, setText] = useState<string>('')
  const [parsed, setParsed] = useState([])
  const toast = useToast()
  const { colorMode, toggleColorMode } = useColorMode()
  const counter = useSelector(getCounter)
  const cUser = useSelector(getUser)
  const dispatch = useDispatch()

  async function handleGetData () {
    const { data } = await axios.get('/api/testya')
    return data
  }

  // useEffect(() => {
  //   handleGetData().then((res) => {
  //     console.log(res)
  //     const k = JSON.stringify(res).split(`\t`)[0].split('\\n').map(item => item.split('\\t'))
  //     setParsed(k)
  //     console.log(k)
  //   })
  // }, [])

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
    console.log('=====>>>', cUser)
    const { data } = await axios.post('/api/test-permission')
    console.log(data)
  }

  async function handleUpd () {
    console.log('=====>>>', cUser)
    const { data } = await axios.post('/api/set-document-superadmin')
    console.log(data)
  }

  return pug`
    // Button.btnSignUp(onClick=handleCreateDoc) TEST PERMISSION
    // Button.btnSignUp(onClick=handleUpd) TEST handleUpd
    div.about
      div.titling
        p.name Eugene Sandryukov
        p.description Experienced with a wide variety of technical skills, I like to solve architecture and technical issues.
        p.description Love React & Node.js. I also develop React Native applications. At the moment I am intensively studying C ++
      img.pic(src='https://sun9-31.userapi.com/impg/ur8xCbJrVDizrJfeUtnbK_Z4TPFZwT00XesinQ/JImSFzvR6ys.jpg?size=2003x2003&quality=96&sign=f12e5c7c80d25f0d51a05177abf9f625&type=album')
    div.feature
      p.title Collection
      div.posts
        p.post(styleName=colorMode === 'dark' ? 'darkPost' : '') React
        p.post2(styleName=colorMode === 'dark' ? 'darkPost2' : '') Node.js
        p.post3(styleName=colorMode === 'dark' ? 'darkPost3' : '') Redux / MobX
        p.post4(styleName=colorMode === 'dark' ? 'darkPost4' : '') Some
      p.seeAll See all
    div.repositories
      p.title Repositories
      div.repos
        div.repo
          p.titleRepo testing
          p.descriptionRepo some desc
          div.footerRepo
            div.dot 
            p.language TypeScript
        div.repo
          p.titleRepo testing
          p.descriptionRepo some desc
          div.footerRepo
            div.dot 
            p.language TypeScript
  `

  // console.log(JSON.stringify(text).split(`\t`)[0].split('\\n').map(item => item.split('\\t')))
  // return (
  //   <React.Fragment>
  //     <span>{cUser ? cUser.email : 'no data'}</span>
  //     {/* <Dashboard />
  //     {parsed && parsed.length && (
  //       <Table variant="simple">
  //         <TableCaption>Imperial to metric conversion factors</TableCaption>
  //         <Thead>
  //           <Tr>
  //             {parsed[1].map((item) => {
  //               return (
  //                 <Th>{item}</Th>
  //               )
  //             })}
  //           </Tr>
  //         </Thead>
  //         <Tbody>
  //           {parsed.filter((k, i) => (i !== 0)).map((item, index) => {
  //             return (
  //             <Tr>
  //               { item.map((d) => <Td>{d}</Td>) }
  //             </Tr>
  //             )
  //           })}
  //           <Tr>
  //             <Td>inches</Td>
  //             <Td>millimetres (mm)</Td>
  //             <Td isNumeric>25.4</Td>
  //           </Tr>
  //           <Tr>
  //             <Td>feet</Td>
  //             <Td>centimetres (cm)</Td>
  //             <Td isNumeric>30.48</Td>
  //           </Tr>
  //           <Tr>
  //             <Td>yards</Td>
  //             <Td>metres (m)</Td>
  //             <Td isNumeric>0.91444</Td>
  //           </Tr>
  //         </Tbody>
  //         <Tfoot>
  //           <Tr>
  //             <Th>To convert</Th>
  //             <Th>into</Th>
  //             <Th isNumeric>multiply by</Th>
  //           </Tr>
  //         </Tfoot>
  //       </Table>
  //     )} */}
  //     {/* <p>{ JSON.stringify(text).split("\t') }</p> */}
  //     {/* <Features />
  //     <div className='block'></div>
  //     <IconButton
  //       variant="outline"
  //       onClick={toggleColorMode}
  //       aria-label="Call Sage"
  //       fontSize="20px"
  //       icon={colorMode === 'light' ? <MoonIcon w={6} h={6} /> : <SunIcon w={6} h={6} />}
  //     />
  //     <Box bg="brand.900">Welcome</Box>
  //     <Button colorScheme="brand">Click me</Button>
  //     <Button
  //       onClick={() =>
  //         toast({
  //           title: "Account created.",
  //           description: "We've created your account for you.",
  //           status: "success",
  //           duration: 500,
  //           isClosable: true,
  //         })
  //       }
  //     >
  //       Show Toast
  //     </Button>
  //     <h1>{counter}</h1>
  //     <h2>{t('i18n-example')}</h2>
  //     <p>
  //       <button value="de_DE" onClick={handleLocaleChange}>
  //         Deutsch 
  //       </button>
  //       <button value="en_US" onClick={handleLocaleChange}>
  //         English 
  //       </button>
  //       <button value="en_US" onClick={handleCount}>
  //         test
  //       </button> */}

  //       <button value="en_US" onClick={handleCreateDoc}>
  //         handle create doc
  //       </button>
  //     {/* <Test /> */}
  //   </React.Fragment>
  // )
}

export default Home
