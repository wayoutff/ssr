import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { emailSignInStart, signOutStart } from '../../store/app/actions'
import { Input, Button, Text } from "@chakra-ui/react"
import css from './index.css'

function Page ({ history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  async function handleSignUp () {
    dispatch(emailSignInStart({ email, password, history }))
  }

  async function handleLogout () {
    dispatch(signOutStart({ history }))
  }
  return pug`
    div.root
      div.form
        Text Email
        Input(
          label='test'
          onChange=(e)=>setEmail(e.target.value)
        )
        Text Password
        Input(
          onChange=(e)=>setPassword(e.target.value)
        )
        Button(onClick=()=>handleSignUp()) Sign in
  `
}

export default Page
