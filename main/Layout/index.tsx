import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUser } from '../store/app/selectors'
import { signOutStart, checkUserSession, signInSuccess } from '../store/app/actions'
import { useTranslation } from 'react-i18next'
import { Button, useToast, Spinner } from "@chakra-ui/react"
import axios from 'axios'
import './index.css'

export default function Layout ({ children, history = {} }) {
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()
  const cUser = useSelector(getUser)
  const dispatch = useDispatch()

  async function isUserStateLoaded () {
    const response = await axios.get('/auth/login_check', {
      withCredentials: true,
    });
    dispatch(signInSuccess(response.data))
    console.log(response.data, 'response.data')
    setLoading(false)
  }

  useEffect(() => {
    isUserStateLoaded()
  }, [])


  function handleLogout () {
    dispatch(signOutStart(history))
  }

  return pug`
    if loading
      div.containerNoData
        Spinner
    else
      div.wrapper
        div.header
          ul.menu
            if cUser && !cUser.user && cUser.email
              li.menuItem
                Link(to="/") Home
              li.menuItem
                Button(onClick=()=> handleLogout()) Logout
            else
              li.menuItem
                Link(to="/sign-in") Sign In
              li.menuItem
              Link(to="/sign-up") Sign Up
        = children
  `
}