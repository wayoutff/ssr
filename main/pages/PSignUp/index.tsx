import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUpStart } from '../../store/app/actions'
import { Input, Text, Button } from "@chakra-ui/react"
import './index.css'

function SignUp ({ history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const dispatch = useDispatch()
  async function handleSignUp () {
    if (password !== repeatPassword) {
      return
    }
    dispatch(signUpStart({ email, password, history }))
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
        Text.text Repeat password
        Input(
          onChange=(e)=>setRepeatPassword(e.target.value)
        )
        Button.btnSignUp(onClick=handleSignUp) Sign up
  `
}

export default SignUp
