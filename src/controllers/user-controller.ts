import UserModel from "../models/user-models";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

dotenv.config();

const register = async (req: any, res: any) => {
    const body = req.body;
    const { email, password, name } = body;

    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Tài khoản đã tồn tại" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        body.password = hashpassword;

        const newUser = new UserModel(body);
        await newUser.save();

        // Loại bỏ mật khẩu trước khi trả về thông tin người dùng
        const userResponse = newUser.toObject() as any; // Chuyển đối tượng MongoDB sang đối tượng JS
        delete userResponse.password; // Xoá trường password khỏi phản hồi


        res.status(201).json({
            message: 'Register thành công',
            user: userResponse
        });

    } catch (error: any) {
        console.log("Error: ", error); // Log lỗi
        res.status(500).json({ message: error.message });
    }
};

const login = async (req: any, res: any) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Tài khoản không tồn tại." });
        }

        // Compare the input password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu không chính xác." });
        }

        // Optionally create a token (JWT) for session management
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'defaultSecret', {
            expiresIn: '2d', // Token expires in 1 hour
        });

        // Remove password before sending back the user data
        const userResponse = user.toObject() as any;
        delete userResponse.password;

        res.status(200).json({
            message: 'Đăng nhập thành công',
            token,
            user: userResponse
        });

    } catch (error: any) {
        console.log("Error: ", error);
        res.status(500).json({ message: error.message });
    }
};

export { register, login };