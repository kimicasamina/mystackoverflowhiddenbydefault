import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import noteModel from '../models/notes-model.js'
import userModel from '../models/user-model.js'
import { createError } from '../utils/createError.js'


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body
    let existingUser 

    // check if user already exists
    try {
        existingUser = await userModel.findOne({ email })
    } catch (error) {
        return next(createError(500, 'Registration failed'))
    }

    if (existingUser) {
        return next(createError(400, 'User already exist! Login Instead'))
    }

    // create new user
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await userModel.create({ username, email, password: hashPassword })

    return res.status(201).json({ message: "User registered successfully", newUser })
    
}

export const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        let user = await userModel.findOne({ email })

        // check if user exist
        if (!user) {
            return next(createError(401, `User doesn't exists`))
            }

        // check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch){
            return next(createError(401, 'Incorrect password'))
        }

        // create token
        const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        })

        res.cookie('access_token', token, {
            httpOnly: true,
            expiresIn: '1h',
            secure: false,
            // withCredentials: true
        })
        const newUser = {
            _id: user._id,
            username: user.username,
            email: user.email
        }
        res.status(201).json(newUser)
        
        
    } catch(err){
        console.log(err)
        return next(createError(500, 'Login failed'))
    }
}

export const logout = async (req, res, next) => {
    let user = req.cookies.access_token
    console.log("DELETE TOKEN", user)
    res.clearCookie('access_token')
    res.json({ success: true, message: "You are logged out." })
}

export const getProfile = async (req, res, next) => {
    let id = req.user

    try {
        const user = await userModel.findById(id).select('-password').populate('notes')
        
        return res.status(200).json(user)

    } catch(err) {
        console.log(err)
        return next(createError(500, err.message))
    }
}

export const getAllUsers = async (req, res, next) => {

    try {
        const users = await userModel.find()
        return res.status(200).json(users)

    } catch(err) {
        console.log(err)
        return next(createError(500, err.message))
    }
}

export const getUser = async (req, res, next) => {
    let user = req.user 

    try {
        const userDoc = await userModel.findById(user).select("-password")
        return res.status(200).json(userDoc)

    } catch(err) {
        console.log(err)
    }
}

// export const getUserByUsername = async (req, res, next) => {
//     let user = req.user 
//     let params = req.params
//     console.log()

//     try {
//         const userDoc = await userModel.findById(user).select("-password").select('-__v').populate('notes')

//         return res.status(200).json(userDoc)

//     } catch(err) {
//         console.log(err)
//     }
// }