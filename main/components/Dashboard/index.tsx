import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  FormControl,
  FormLabel,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react"
import './index.css'

export default function Dashboard () {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()
  const finalRef = React.useRef()

  return pug`
    div.root
      Button.addClient(
        colorScheme="blue"
        size="sm"
        onClick=onOpen
      )='Добавить клиента'
      Modal(
        initialFocusRef=initialRef
        finalFocusRef=finalRef
        isOpen=isOpen
        onClose=onClose
      )
        ModalOverlay
        ModalContent
          ModalHeader Добавление нового пользователя
          ModalCloseButton
          ModalBody(pb=6)
            FormControl
              FormLabel Токен клиента
              Input(ref=initialRef placeholder="Введите токен клиента")
            FormControl(mt=4)
              FormLabel Логин клиента
              Input(placeholder="Введите логин клиента")
          ModalFooter
            Button(colorScheme="blue" mr=3) Добавить
            Button(onClick=onClose) Отмена
  `
}