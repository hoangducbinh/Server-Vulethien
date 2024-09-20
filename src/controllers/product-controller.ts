import { Request, Response } from "express"
import ProductModel from "../models/product-models"
import { IProduct } from "../types"
import CategoryModel from "../models/category-models"

export const createProduct = async (req: Request, res: Response) => {
    const { name, category_id, description, import_price, quantity_in_stock, reorder_level, unit_price, unit }: IProduct = req.body
    try {
        const product = await ProductModel.findOne({ name })
        if (product) return res.status(400).json({ message: 'Tên sản phẩm này đã tồn tại' })
        const checkCategory = await CategoryModel.findOne({ _id: category_id })
        if (!checkCategory) return res.status(400).json({ message: 'Danh mục sản phẩm không tồn tại' })
        const newProduct = await ProductModel.create({
            category_id,
            description,
            import_price,
            name,
            quantity_in_stock,
            reorder_level,
            unit_price,
            unit
        })
        res.status(201).json({
            message: "Thêm sản phẩm mới thành công",
            data: newProduct
        })


    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}


export const getAllProduct = async (req: Request, res: Response) => {
    try {
        const getAll = await ProductModel.find()
        res.status(200).json({
            message: 'Đã lấy được toàn bộ danh sách sản phẩm',
            data: getAll
        })

    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { unit,name, category_id, description, import_price, quantity_in_stock, reorder_level, unit_price, _id }: IProduct = req.body
    try {
        const updateProduct = await ProductModel.findByIdAndUpdate(
            _id,
            {
                category_id,
                description,
                import_price,
                name,
                quantity_in_stock,
                reorder_level,
                unit_price,
                unit
            },
            { new: true, runValidators: true }
        )
        res.status(200).json({
            message: 'Cập nhật sản phẩm thành công',
            data: updateProduct
        })
        if (!updateProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' })
        }


    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { _id }: IProduct = req.body
    try {
        const deleteProduct = await ProductModel.findByIdAndDelete(_id)
        res.status(200).json({
            message: 'Xóa sản phẩm thành công',
            data: deleteProduct
        })
        if (!deleteProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' })
        }

    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

export const getProductById = async (req: Request, res: Response) => {
    const { _id }: IProduct = req.body
    try {
        const getProduct = await ProductModel.findById(_id)
        res.status(200).json({
            message: 'Lấy sản phẩm thành công',
            data: getProduct
        })
        if (!getProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' })
        }
    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}


export const getProductsByCategory = async (req: Request, res: Response) => {
    const { _id } = req.params
    try {
        const getProduct = await ProductModel.find(
            {
                category_id: _id
            }
        )
        res.status(200).json({
            message: 'Lấy sản phẩm theo danh mục thành công',
            data: getProduct
        })
        if (!getProduct) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' })
        }
    }
    catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}