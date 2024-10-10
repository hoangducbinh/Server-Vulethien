import { Request, Response } from "express";
import StockExitModel from "../models/stockExit-models";
import StockExitDetailModel from "../models/stockExitDetail-models";
import OrderModel from "../models/order-models";
import OrderDetailModel from "../models/orderDetail-models";
import ProductModel from "../models/product-models";
import WarehouseModel from "../models/warehouse-models";

export const createStockExit = async (req: Request, res: Response) => {
    const { order_id, warehouse_id } = req.body;

    try {
        // Fetch the order
        const order = await OrderModel.findById(order_id).populate('customer_id');
        if (!order) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }

        // Fetch order details
        const orderDetails = await OrderDetailModel.find({ order_id }).populate('product_id');

        // Create stock exit
        const newStockExit = await StockExitModel.create({
            customer_id: order.customer_id,
            warehouse_id,
            date: new Date(),
            total_value: order.total_value
        });

        // Create stock exit details
        const stockExitDetails = orderDetails.map(detail => ({
            stock_exit_id: newStockExit._id,
            product_id: detail.product_id._id,
            quantity_ordered: detail.quantity,
            quantity_received: detail.quantity, // Assuming all ordered items are received
        }));

        await StockExitDetailModel.insertMany(stockExitDetails);

        // Update product quantities in warehouse
        for (const detail of orderDetails) {
            await ProductModel.findByIdAndUpdate(
                detail.product_id._id,
                { $inc: { quantity: -detail.quantity } }
            );
        }

        // Fetch warehouse info
        const warehouse = await WarehouseModel.findById(warehouse_id);

        res.status(201).json({
            message: "Xuất kho thành công",
            data: {
                stock_exit: newStockExit,
                customer: order.customer_id,
                products: orderDetails.map(detail => ({
                    product: detail.product_id,
                    quantity: detail.quantity
                })),
                warehouse: warehouse
            }
        });
    } catch (error: any) {
        console.log('Error', error);
        res.status(500).json({ message: error.message });
    }
};

export const getStockExits = async (req: Request, res: Response) => {
    try {
        const stockExits = await StockExitModel.find()
            .populate('customer_id', 'name')
            .populate('warehouse_id', 'name');

        res.status(200).json({
            message: "Lấy danh sách xuất kho thành công",
            data: stockExits
        });
    } catch (error: any) {
        console.log('Error', error);
        res.status(500).json({ message: error.message });
    }
};

export const getStockExitById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const stockExit = await StockExitModel.findById(id)
            .populate('customer_id', 'name email address phone')
            .populate('warehouse_id', 'name address');

        if (!stockExit) {
            return res.status(404).json({ message: "Không tìm thấy thông tin xuất kho" });
        }

        const stockExitDetails = await StockExitDetailModel.find({ stock_exit_id: id })
            .populate('product_id', 'name unit_price image');

        res.status(200).json({
            message: "Lấy thông tin xuất kho thành công",
            data: {
                stock_exit: stockExit,
                details: stockExitDetails
            }
        });
    } catch (error: any) {
        console.log('Error', error);
        res.status(500).json({ message: error.message });
    }
};