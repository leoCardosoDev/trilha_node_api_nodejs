import express from 'express'

import create from './services/create'
import list from './services/list'

const router = express.Router()

router.post('/', create)
router.get('/', list)

export default router