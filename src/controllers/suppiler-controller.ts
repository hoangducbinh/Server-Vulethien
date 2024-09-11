import { Request, Response } from "express"
import SupplierModel from "../models/supplier-models"
import { ISupplier, } from "../types"



export const createSuppiler = async (req: Request, res: Response) => {
    const body = req.body
    const { name, contact_info, address }: ISupplier = body
    try {
        const supplier = await SupplierModel.findOne({ name })
        if (supplier) {
            return res.status(400).json({ messege: "Nhà cung cấp đã tồn tại" })
        }

        const newSuppiler = await SupplierModel.create({
            name,
            contact_info,
            address,
        })

        res.status(201).json({
            message: 'Thêm nhà cung cấp thành công',
            data: newSuppiler
        })

    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

export const getAllSuppiler = async (req: Request, res: Response) => {
    try {
        const suppliers = await SupplierModel.find()
        res.status(200).json({
            message: 'Lấy danh sách nhà cung cấp thành công',
            data: suppliers
        })
    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }

}

export const updateSuppiler = async (req: Request, res: Response) => {
    try {
        const { name, contact_info, address, _id }: ISupplier = req.body
        const editSuppiler = await SupplierModel.findByIdAndUpdate(
            _id,
            {
                name,
                contact_info,
                address,
            },
            { new: true, runValidators: true }
        )
        res.status(200).json({
            message: 'Cập nhật nhà cung cấp thành công',
            data: editSuppiler
        })
        if (!editSuppiler) {
            return res.status(400).json({ message: 'Nhà cung cấp không tồn tại' })
        }

    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

export const deleteSupplier = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params; // Lấy _id từ params trong URL

        // Tìm và xóa nhà cung cấp theo _id
        const deletedSupplier = await SupplierModel.findByIdAndDelete(_id);

        if (!deletedSupplier) {
            return res.status(404).json({ message: "Nhà cung cấp không tìm thấy" });
        }

        res.status(200).json({
            message: 'Xóa nhà cung cấp thành công',
            data: deletedSupplier
        });

    } catch (error: any) {
        console.log('Error:', error);
        res.status(500).json({ message: error.message });
    }
};