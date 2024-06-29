import express from 'express'
const router = express.Router()
import verifyToken from '../middleware/verifyToken.js'
import { getNotesByUsername, getNotes, addNotes, deleteNote, updateNote } from '../controller/notes-controller.js'


router.get('/', verifyToken,  getNotes)
router.get('/:username', verifyToken, getNotesByUsername)
router.post('/add', addNotes)
router.delete('/:id/delete', deleteNote)
router.post('/:id/update', updateNote)
// router.get('/:id', getNotesById)
// router.patch('/update', updateNotes)
// router.delete('/delete', deleteNotes)

export default router

