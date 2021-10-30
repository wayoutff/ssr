import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signUpStart } from '../../store/app/actions'
import { Input, Button } from "@chakra-ui/react"
import './index.css'

function SignUp ({ history }) {
  // const signUpStart = use
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  async function handleSignUp () {
    // await axios.post('')
    console.log(email, password, history)
    dispatch(signUpStart({ email, password, history }))
  }
  return pug`
    h1.rootTest Sign up page
    Input(
      onChange=(e)=>setEmail(e.target.value)
    )
    Input(
      onChange=(e)=>setPassword(e.target.value)
    )
    Button(onClick=()=>handleSignUp()) Sign up
  `
}

export default SignUp
