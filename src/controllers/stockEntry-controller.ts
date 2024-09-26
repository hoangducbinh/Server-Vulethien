import { Request, Response } from "express"
import { IPayment, IStockEntry, IStockEntryDetail } from "../types"
import StockEntryModel from "../models/stockEntry-models"
import StockEntryDetailModel from "../models/stockEntryDetail-models"

import mongoose from "mongoose"
import ProductModel from "../models/product-models"
import PaymentModel from "../models/payment-models"

export const createStockEntry = async (req: Request, res: Response) => {
    const { supplier_id, warehouse_id, date_received, total_value}: IStockEntry = req.body
    const stockEntryDetails: IStockEntryDetail[] = req.body.stockEntryDetails
    const payment: IPayment = req.body.payment
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const stockEntry = await StockEntryModel.create([{ 
            supplier_id, 
            warehouse_id, 
            date_received, 
            total_value, 
        }], { session })

        const stockEntryDetailsWithId = stockEntryDetails.map(detail => ({
            ...detail,
            stock_entry_id: stockEntry[0]._id
        }))

        const createdStockEntryDetails = await StockEntryDetailModel.create(stockEntryDetailsWithId, { session })

        // Cập nhật số lượng tồn kho cho mỗi sản phẩm
        for (const detail of stockEntryDetails) {
            await ProductModel.findByIdAndUpdate(
                detail.product_id,
                { $inc: { quantity_in_stock: detail.quantity_received },
                  $set: { import_price: detail.import_price }
             },
                { session }
            )
        }
        await session.commitTransaction()
        session.endSession()

        const fullResponse = {
            stockEntry: stockEntry[0],
            stockEntryDetails: createdStockEntryDetails,
        }
        res.status(201).json({ 
            message: "Đã thêm hàng vào kho và cập nhật số lượng tồn kho thành công", 
            fullResponse
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        res.status(500).json({ 
            message: "Đã có lỗi xảy ra", 
            error 
        })
    }
}

export const getStockEntryById = async (req: Request, res: Response) => {
    const { _id } = req.params
    try {
        const stockEntry = await StockEntryModel.findById(_id)
        if (!stockEntry) {
            return res.status(404).json({ message: "Không tìm thấy hàng nhập kho" })
        }
        res.status(200).json({ message: "Lấy thông tin hàng nhập kho thành công", stockEntry })
    } catch (error) {
        res.status(500).json({ message: "Đã có lỗi xảy ra", error })
    }
}

export const updateStockEntry = async (req: Request, res: Response) => {
    const { _id } = req.params
    const { supplier_id, warehouse_id, date_received, total_value, payment }: IStockEntry = req.body
    const stockEntryDetails: IStockEntryDetail[] = req.body.stockEntryDetails

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        // Lấy thông tin phiếu nhập cũ
        const oldStockEntry = await StockEntryModel.findById(_id).session(session)
        if (!oldStockEntry) {
            await session.abortTransaction()
            session.endSession()
            return res.status(404).json({ message: "Không tìm thấy phiếu nhập kho" })
        }

        // Cập nhật thông tin chính của phiếu nhập
        const updatedStockEntry = await StockEntryModel.findByIdAndUpdate(_id, 
            { supplier_id, warehouse_id, date_received, total_value, payment },
            { new: true, session }
        )

        // Lấy chi tiết phiếu nhập cũ
        const oldStockEntryDetails = await StockEntryDetailModel.find({ stock_entry_id: _id }).session(session)

        // Hoàn tác số lượng sản phẩm cũ
        for (const oldDetail of oldStockEntryDetails) {
            await ProductModel.findByIdAndUpdate(
                oldDetail.product_id,
                { $inc: { quantity_in_stock: -oldDetail.quantity_received } },
                { session }
            )
        }

        // Xóa chi tiết phiếu nhập cũ
        await StockEntryDetailModel.deleteMany({ stock_entry_id: _id }).session(session)

        // Tạo chi tiết phiếu nhập mới
        const newStockEntryDetails = await StockEntryDetailModel.create(
            stockEntryDetails.map(detail => ({ ...detail, stock_entry_id: _id })),
            { session }
        )

        // Cập nhật số lượng sản phẩm mới
        for (const newDetail of stockEntryDetails) {
            await ProductModel.findByIdAndUpdate(
                newDetail.product_id,
                { $inc: { quantity_in_stock: newDetail.quantity_received } },
                { session }
            )
        }

        await session.commitTransaction()
        session.endSession()

        res.status(200).json({ 
            message: "Cập nhật thông tin phiếu nhập kho và số lượng sản phẩm thành công", 
            stockEntry: updatedStockEntry,
            stockEntryDetails: newStockEntryDetails
        })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        res.status(500).json({ message: "Đã có lỗi xảy ra", error })
    }
}



export const deleteStockEntry = async (req: Request, res: Response) => {
    const { _id } = req.params

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        // Lấy thông tin phiếu nhập cần xóa
        const stockEntry = await StockEntryModel.findById(_id).session(session)
        if (!stockEntry) {
            await session.abortTransaction()
            session.endSession()
            return res.status(404).json({ message: "Không tìm thấy phiếu nhập kho" })
        }

        // Lấy chi tiết phiếu nhập
        const stockEntryDetails = await StockEntryDetailModel.find({ stock_entry_id: _id }).session(session)

        // Hoàn tác số lượng sản phẩm
        for (const detail of stockEntryDetails) {
            await ProductModel.findByIdAndUpdate(
                detail.product_id,
                { $inc: { quantity_in_stock: -detail.quantity_received } },
                { session }
            )
        }

        // Xóa chi tiết phiếu nhập
        await StockEntryDetailModel.deleteMany({ stock_entry_id: _id }).session(session)

        // Xóa phiếu nhập
        await StockEntryModel.findByIdAndDelete(_id).session(session)

        await session.commitTransaction()
        session.endSession()

        res.status(200).json({ message: "Đã xóa phiếu nhập kho và cập nhật số lượng sản phẩm thành công" })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        res.status(500).json({ message: "Đã có lỗi xảy ra", error })
    }
}

export const getAllStockEntries = async (req: Request, res: Response) => {
    try {
        const stockEntries = await StockEntryModel.find()
            .populate('supplier_id', 'name') // Giả sử bạn muốn lấy tên nhà cung cấp
            .populate('warehouse_id', 'name') // Giả sử bạn muốn lấy tên kho
            .populate('payment', 'amount method status')
            .sort({ date_received: -1 }) // Sắp xếp theo ngày nhận, mới nhất lên đầu
        
        res.status(200).json({ 
            message: "Lấy danh sách phiếu nhập kho thành công", 
            stockEntries
        })
    } catch (error) {
        res.status(500).json({ message: "Đã có lỗi xảy ra", error })
    }
}

export const getStockEntryDetails = async (req: Request, res: Response) => {
    const { _id } = req.params
    try {
        const stockEntryDetails = await StockEntryDetailModel.find({ stock_entry_id: _id })
        res.status(200).json({ message: "Lấy chi tiết phiếu nhập kho thành công", stockEntryDetails })
    } catch (error) {
        res.status(500).json({ message: "Đã có lỗi xảy ra", error })
    }
}
