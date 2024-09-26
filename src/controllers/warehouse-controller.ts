import { Request, Response } from "express"
import WarehouseModel from "../models/warehouse-models"



export const createWarehouse = async (req: Request, res: Response) => {
    const {name, location} = req.body

    try {
        const warehouse = await WarehouseModel.findOne({name})
    if(warehouse)
    {
        return res.status(400).json({
            message: 'Tên kho hàng đã tồn tại'
        })
    }
    const newWarehouse = await WarehouseModel.create({
        name,
        location
    })
    res.status(201).json({
        message: 'Thêm kho thành công',
        data: newWarehouse
    })
    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

export const getAllWarehouse = async (req: Request, res: Response) => {
    try {
        const findwarehouse = await WarehouseModel.find()
        if(!findwarehouse)
        {
            return res.status(400).json({
                message: 'Không có danh sách'
            })
        }
        res.status(200).json({
            message: 'Đã lấy danh sách thành công',
            data: findwarehouse
        })

    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}


export const updateWarehouse = async (req: Request, res: Response) =>{
    const {_id, name, location } = req.body
    try {
        const updatewarehouse = await WarehouseModel.findByIdAndUpdate(
            _id,{
                name,
                location
            },
            {
                new: true, runValidators: true
            }
        )
         if(!updatewarehouse)
         {
            return res.status(400).json({
                message: 'Không tìm thấy kho hàng'
            })
         }
         res.status(200).json({
            message: 'Cập nhật thành công',
            data: updatewarehouse
         })


    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

export const deleteWarehouse = async (req: Request, res: Response) =>{
    const {_id} = req.params
    try {
        const deletewarehouse = await WarehouseModel.findByIdAndDelete(_id)

        if (!deletewarehouse) {
            return res.status(404).json({ message: "Không tìm thấy" });
        }

        res.status(200).json({
            message: 'Xóa nhà kho thành công',
            data: deletewarehouse
        });
    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}