import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { emailSignInStart, signOutStart } from '../../store/app/actions'
import { Input, Button, Text } from "@chakra-ui/react"
import './index.css'

function Page ({ history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  async function handleSignIn () {
    dispatch(emailSignInStart({ email, password, history }))
  }

  return pug`
    div.root
      div.form
        Text Email
        Input(
          onChange=(e)=>setEmail(e.target.value)
        )
        Text.text Password
        Input(
          onChange=(e)=>setPassword(e.target.value)
        )
        Button.btnSignIn(onClick=handleSignIn) Sign in
  `
}

export default Page
