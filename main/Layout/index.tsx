import React, { useMemo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUser } from '../store/app/selectors'
import { signOutStart, checkUserSession, signInSuccess } from '../store/app/actions'
import { useTranslation } from 'react-i18next'
import { Button, useToast, Spinner, Divider, Box, IconButton, useDisclosure, useColorMode } from "@chakra-ui/react"
import { MoonIcon, HamburgerIcon, SunIcon } from '@chakra-ui/icons'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"
import axios from 'axios'
import './index.module.css'

export default function Layout ({ children, history = {} }) {
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()
  const cUser = useSelector(getUser)
  const dispatch = useDispatch()
  const { colorMode, toggleColorMode } = useColorMode()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState("top")


  async function isUserStateLoaded () {
    const response = await axios.get('/auth/login_check', {
      withCredentials: true,
    });
    dispatch(signInSuccess(response.data))
    setLoading(false)
  }

  useEffect(() => {
    isUserStateLoaded()
  }, [])


  function handleLogout () {
    dispatch(signOutStart(history))
  }

  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const isUserLoggedIn = useMemo(() => {
    return cUser && !cUser.user && cUser.email
  }, [JSON.stringify(cUser)])

  const getHamburgerIcon = pug`HamburgerIcon(w=5 h=5)`
  const getMoonIcon = pug`MoonIcon(w=5 h=5)`
  const getSunIcon = pug`SunIcon(w=5 h=5)`


  const getDrawer = () => {
    return pug`
      Drawer(
        placement=placement
        size='xl'
        onClose=onClose
        isOpen=isOpen
      )
        DrawerOverlay
        DrawerContent
          DrawerCloseButton
          DrawerBody
            ul.menuDrawer
              if isUserLoggedIn
                li.menuItem
                  Link(to="/" onClick=()=>onClose()) Home
                li.menuItem
                  Link(to="/snippets" onClick=()=>onClose()) Snippets
                li.menuItem
                  Link(to="/collections" onClick=()=>onClose()) Collections
                li.menuItem
                  Button(styleName='logout' onClick=()=> handleLogout()) Logout
              else
                li.menuItem
                  Link(to="/sign-in") Sign In
                li.menuItem
                  Link(to="/sign-up") Sign Up
    `
  }
  return pug`
    if loading
      div.containerNoData
        Spinner
    else
      div.wrapperLayout
        div.header
          if getWindowDimensions().width > 400
            ul.menu
              if isUserLoggedIn
                li.menuItem
                  Link(to="/") Home
                li.menuItem
                  Link(to="/snippets") Snippets
                li.menuItem
                  Link(to="/collections") Collections
                li.menuItem
                  Button(styleName='logout' onClick=()=> handleLogout()) Logout
              else
                li.menuItem
                  Link(to="/sign-in") Sign In
                li.menuItem
                  Link(to="/sign-up") Sign Up
          else
            IconButton(
              variant="outline"
              onClick=onOpen
              aria-label="Call Sage"
              fontSize="20px"
              icon=getHamburgerIcon
            )
          div.switch
            IconButton(
              variant="outline"
              onClick=toggleColorMode
              aria-label="Call Sage"
              fontSize="20px"
              icon=colorMode === 'light' ? getMoonIcon : getSunIcon
            )
        = children
      = getDrawer()
      Divider.divider
      div.footer
        ul.column
          li
            Box(as="a" color="gray.600" fontSize="sm" href='/') Home
          li
            Box(as="a" color="gray.600" fontSize="sm" href='/') About
        ul.column
          li
            Box(as="a" color="gray.600" fontSize="sm" href='https://instagram/_statix') Instagram
          li
            Box(as="a" color="gray.600" fontSize="sm" href='https://career.habr.com/eugene-sandryukov') Habr Career
          li
            Box(as="a" color="gray.600" fontSize="sm" href='https://github.com/statix-dev') GitHub
        ul.column
          li
            Box(as="a" color="gray.600" fontSize="sm" href='/collections') Collections
          li
            Box(as="a" color="gray.600" fontSize="sm" href='/snippets') Snippets
  `
}