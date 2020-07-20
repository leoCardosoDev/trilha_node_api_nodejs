import express from 'express'

import get from './services/get'

const router = express.Router()

router.get('/:cep', get)

export default router