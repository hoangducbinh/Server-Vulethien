import { Request, Response } from "express"
import CustomerModel from "../models/customer-models"
import { ICustomer } from "../types"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const createCustomer = async (req: Request, res: Response) => {
    const { name, phone, address, avatar, email, password }: ICustomer = req.body
    try {
        // Kiểm tra xem email đã tồn tại chưa
        const existingCustomer = await CustomerModel.findOne({ email })
        if (existingCustomer) {
            return res.status(400).json({ message: "Email đã được sử dụng" })
        }

        // Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const customer = await CustomerModel.create({
            name,
            phone,
            address,
            avatar,
            email,
            password: hashedPassword
        })

        // Loại bỏ mật khẩu trước khi trả về thông tin khách hàng
        const customerResponse = customer.toObject() as any
        delete customerResponse.password

        res.status(201).json({
            message: "Tạo tài khoản khách hàng thành công",
            customer: customerResponse
        })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const loginCustomer = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const customer = await CustomerModel.findOne({ email })
        if (!customer) {
            return res.status(404).json({ message: "Tài khoản không tồn tại" })
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, customer.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Mật khẩu không đúng" })
        }

        // Tạo JWT token
        const token = jwt.sign(
            { id: customer._id, email: customer.email },
            process.env.JWT_SECRET || 'defaultSecret',
            { expiresIn: '2d' }
        )

        // Loại bỏ mật khẩu trước khi trả về thông tin khách hàng
        const customerResponse = customer.toObject() as any
        delete customerResponse.password

        res.status(200).json({
            message: "Đăng nhập thành công",
            token,
            customer: customerResponse
        })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const getCustomer = async (req: Request, res: Response) => {
    try {
        const customers = await CustomerModel.find().select('-password')
        res.status(200).json({
            message: "Lấy danh sách khách hàng thành công",
            customers
        })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const updateCustomer = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, phone, address, avatar, email }: Partial<ICustomer> = req.body
    try {
        const customer = await CustomerModel.findByIdAndUpdate(
            id,
            { name, phone, address, avatar, email },
            { new: true }
        ).select('-password')

        if (!customer) {
            return res.status(404).json({ message: "Không tìm thấy khách hàng" })
        }

        res.status(200).json({
            message: "Cập nhật thông tin khách hàng thành công",
            customer
        })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteCustomer = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const customer = await CustomerModel.findByIdAndDelete(id)
        if (!customer) {
            return res.status(404).json({ message: "Không tìm thấy khách hàng" })
        }
        res.status(200).json({
            message: "Xóa khách hàng thành công"
        })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}