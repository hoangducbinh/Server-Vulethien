import { Request, Response } from "express";
import { ICategory } from "../types";
import CategoryModel from "../models/category-models";


export const createCategory = async (req: Request, res: Response) => {
    const body = req.body
    const { _id, description, name }: ICategory = body
    if (!name) {
        return res.status(401).json({ message: 'Tên danh mục không được để trống' })
    }
    try {
        const category = await CategoryModel.findOne({ name })
        if (category) {
            return res.status(400).json({ message: 'Tên danh mục này đã có rồi nha' })
        }
        const newCategory = await CategoryModel.create(
            {
                name,
                description,
            })  
        res.status(201).json({
            message: 'Thêm danh mục thành công',
            data: newCategory
        })
    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

export const getAllCategory = async (req: Request, res: Response) => {
    try {
        const category = await CategoryModel.find()
        res.status(200).json({
            message: 'Lấy danh sách danh mục thành công',
            data: category
        })
    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    const {_id, description, name}:ICategory = req.body
    try {
        const editCategory = await CategoryModel.findByIdAndUpdate(
            _id,{
                description,
                name
            },
            {new: true, runValidators: true}
        )
        if(!editCategory)
        {
            return res.status(400).json({
                message: 'Không tìm thấy danh mục'
            })
        }
        res.status(200).json({
            message: 'Cập nhật danh mục thành công',
            data: editCategory
        })

    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}


export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const {_id} = req.params 
        const deleteCategory = await CategoryModel.findByIdAndDelete(_id)
        
        if(!deleteCategory)
        {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }

        res.status(200).json({
            message: 'Xoá danh mục thành công',
            data: deleteCategory
        })
    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}