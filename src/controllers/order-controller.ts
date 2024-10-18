import { Request, Response } from "express"
import OrderModel from "../models/order-models"
import OrderDetailModel from "../models/orderDetail-models"
import { IOrder } from "../types"
import StockExitModel from "../models/stockExit-models"
import StockExitDetailModel from "../models/stockExitDetail-models"


// Create a new order
export const createOrder = async (req: Request, res: Response) => {
    const { customer_id, status, total_value, orderDetails }: IOrder = req.body
    try {
        const newOrder = await OrderModel.create({
            customer_id,
            status,
            total_value,
        })

        // Create order details
        if (orderDetails && orderDetails.length > 0) {
            const orderDetailsWithOrderId = orderDetails.map(detail => ({
                ...detail,
                order_id: newOrder._id
            }))
            await OrderDetailModel.insertMany(orderDetailsWithOrderId)
        }


        res.status(201).json({
            message: "Tạo đơn hàng mới thành công",
            data: newOrder
        })
    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

// Get all orders
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const sort = req.query.sort as string || 'date_ordered';
        const order = req.query.order as string || 'desc';
        const search = req.query.search as string || '';
        const status = req.query.status as string || '';

        const query: any = {};
        if (search) {
            query.$or = [
                { '_id': { $regex: search, $options: 'i' } },
                { 'customer_id.name': { $regex: search, $options: 'i' } }
            ];
        }
        if (status && status !== 'all') {
            query.status = status;
        }

        const totalOrders = await OrderModel.countDocuments(query);
        const totalPages = Math.ceil(totalOrders / limit);

        const orders = await OrderModel.find(query)
            .populate('customer_id', 'name')
            .sort({ [sort]: order === 'desc' ? -1 : 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            message: "Lấy danh sách đơn hàng thành công",
            data: {
                orders,
                currentPage: page,
                totalPages,
                totalOrders
            }
        });
    } catch (error: any) {
        console.log('Error', error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single order by ID
export const getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const order = await OrderModel.findById(id)
                .populate('customer_id', 'name email address phone')
            .lean() // Use lean() for better performance

        if (!order) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" })
        }

        // Fetch order details
        const orderDetails = await OrderDetailModel.find({ order_id: id })
            .populate('product_id', 'name unit_price image')
            .lean()

        // Combine order and order details
        const orderWithDetails = {
            ...order,
            items: orderDetails.map(detail => ({
                product_id: detail.product_id,
                quantity: detail.quantity,
                price: detail.price
            }))
        }

        res.status(200).json({
            message: "Lấy thông tin đơn hàng thành công",
            data: orderWithDetails
        })
    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

// Update an order
export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status }: Partial<IOrder> = req.body
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        ).populate('customer_id', 'name email')

        if (!updatedOrder) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" })
        }

        // Fetch order details
        const orderDetails = await OrderDetailModel.find({ order_id: id })
            .populate('product_id', 'name unit_price image')
            .lean()

        // Combine order and order details
        const orderWithDetails = {
            ...updatedOrder.toObject(),
            items: orderDetails.map(detail => ({
                product_id: detail.product_id,
                quantity: detail.quantity,
                price: detail.price
            }))
        }

        res.status(200).json({
            message: "Cập nhật trạng thái đơn hàng thành công",
            data: orderWithDetails
        })
    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const deletedOrder = await OrderModel.findByIdAndDelete(id)
        if (!deletedOrder) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" })
        }
        // Delete associated order details
        await OrderDetailModel.deleteMany({ order_id: id })
        res.status(200).json({
            message: "Xóa đơn hàng thành công",
            data: deletedOrder
        })
    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

// Get order details for a specific order
export const getOrderDetails = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const orderDetails = await OrderDetailModel.find({ order_id: id })
            .populate('product_id', 'name unit_price')
        if (orderDetails.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy chi tiết đơn hàng" })
        }
        res.status(200).json({
            message: "Lấy chi tiết đơn hàng thành công",
            data: orderDetails
        })
    } catch (error: any) {
        console.log('Error', error)
        res.status(500).json({ message: error.message })
    }
}

export const updateProductPreparedStatus = async (req: Request, res: Response) => {
    const { orderId, productId, prepared } = req.body;
    try {
        const orderDetail = await OrderDetailModel.findOne({ order_id: orderId, product_id: productId });
        if (!orderDetail) {
            return res.status(404).json({ message: "Không tìm thấy chi tiết sản phẩm" });
        }

        // Update the prepared status of the product
        orderDetail.prepared = prepared;
        await orderDetail.save();

        res.status(200).json({ message: "Cập nhật trạng thái sản phẩm thành công" });
    } catch (error: any) {
        console.log('Error', error);
        res.status(500).json({ message: error.message });
    }
};

// export const updateOrderStatus = async (req: Request, res: Response) => {
//     const { orderId, status } = req.body;
//     try {
//         const updatedOrder = await OrderModel.findByIdAndUpdate(
//             orderId,
//             { status },
//             { new: true, runValidators: true }
//         ).populate('customer_id', 'name');

//         if (!updatedOrder) {
//             return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
//         }

//         res.status(200).json({
//             message: "Cập nhật trạng thái đơn hàng thành công",
//             data: updatedOrder
//         });
//     } catch (error: any) {
//         console.log('Error', error);
//         res.status(500).json({ message: error.message });
//     }
// };


export const updateOrderStatus = async (req: Request, res: Response) => {
    const { orderId, status } = req.body;
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true, runValidators: true }
        ).populate('customer_id', 'name');

        if (!updatedOrder) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }

        // If the new status is "exported", create stockExit and stockExitDetail
        if (status === "exported") {
            // Fetch order details
            const orderDetails = await OrderDetailModel.find({ order_id: orderId }).populate('product_id');

            // Create stock exit
            const newStockExit = await StockExitModel.create({
                customer_id: updatedOrder.customer_id,
                date: new Date(),
                total_value: updatedOrder.total_value
            });

            // Create stock exit details
            const stockExitDetails = orderDetails.map(detail => ({
                stock_exit_id: newStockExit._id,
                product_id: detail.product_id._id,
                quantity_ordered: detail.quantity,
                quantity_received: detail.quantity, // Assuming all ordered items are received
            }));

            await StockExitDetailModel.insertMany(stockExitDetails);

            res.status(200).json({
                message: "Cập nhật trạng thái đơn hàng thành công",
                data: {
                    order: updatedOrder,
                    stock_exit: newStockExit
                }
            });
        } else {
            res.status(200).json({
                message: "Cập nhật trạng thái đơn hàng thành công",
                data: updatedOrder
            });
        }
    } catch (error: any) {
        console.log('Error', error);
        res.status(500).json({ message: error.message });
    }
};

