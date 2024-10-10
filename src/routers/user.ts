import express from 'express'
import { deleteUser, getUser, login, register, updateUser, getUserById } from '../controllers/user-controller';



const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/user/', getUser)
userRouter.put('/user/:id', updateUser)
userRouter.delete('/user/:id', deleteUser)
userRouter.get('/user/:id', getUserById)
export default userRouter;