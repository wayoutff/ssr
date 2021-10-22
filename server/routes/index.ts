import express from 'express'
import { UserModel } from '../models'
import webhookVerification from '../middleware/webhookVerification'
import { i18nextXhr, refreshTranslations } from './controllers/locales'

const router = express.Router()

router.post('/create-doc', async (req, res, next) => {
  const newUserDoc = new UserModel({
    text: 'tes11111t'
  })
  // newUser.getTestMessage()
  // console.log(newUser, '<<<<< NEW USER')
  const user = await newUserDoc.save()
  console.log(user)
})

// locales with i18n
router.get('/locales/refresh', webhookVerification, refreshTranslations)
// It's probably a good idea to serve these static assets with Nginx or Apache as well:
router.get('/locales/:locale/:ns.json', i18nextXhr)


export default router