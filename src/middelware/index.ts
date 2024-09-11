import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user-models";


export interface AuthRequest extends Request {
    user?: string; // Có thể là string hoặc đối tượng tùy thuộc vào cách bạn sử dụng
}

export const authenticationMiddleware = async (
    request: AuthRequest,
    response: Response,
    next: NextFunction
) => {
    try {
        const authorization = request.headers['authorization'];

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return response.status(401).json({ error: "Authorization header is required and must be a Bearer token" });
        }

        // Trích xuất token từ 'Bearer <token>'
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'express') as { _id: string };
        
        // Tìm kiếm người dùng trong cơ sở dữ liệu
        const existingUser = await UserModel.findById(decoded._id);
        
        if (!existingUser) {
            return response.status(401).json({ error: "User not found" });
        }

        // Gán thông tin người dùng vào request
        request.user = existingUser.id;

        next();
    } catch (error) {
        console.error(error); // Đưa ra lỗi để dễ dàng debug
        return response.status(401).json({ message: "Invalid token" });
    }
};
