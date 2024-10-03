
import { Types } from "mongoose"

export interface IUser {
    email: string,
    password: string,
    name: string,
    role: string,
    created_at: Date,
    updated_at: Date,
    avatar: string
    _id: string
}

export interface ISupplier {
    name: string,
    contact_info: string,
    address: string
    _id: string
}

export interface IStockExitDetail {
    _id: string,
    product_id: string,
    quantity: number,
    price: number,
    stock_exit_id: string
}

export interface IProduct {
    name: string,
    description: string,
    category_id: string,
    unit_price: number,
    import_price: number,
    quantity_in_stock: number,
    reorder_level: number,
    _id: string,
    unit: string
}

export interface ICategory {
    name: string,
    description: string
    _id: string
}

export interface IStockExit {
    customer_id: string,
    warehouse_id: string,
    total_value: number,
    payment: string[],
    returns: string[],
    _id: string,
    date: Date
}

export interface IStockEntry {
    supplier_id: string,
    warehouse_id: string,
    date_received: Date,
    total_value: number,
    payment: string[],
    _id: string
}

export interface ICategory {
    _id: string,
    name: string,
    description: string
}

export interface IStockEntryDetail {
    _id: string,
    stock_entry_id: string,
    product_id: string,
    quantity_received: number,
    quantity_ordered: number,
    import_price: number,
}

export interface IPayment {
    _id: string,
    stock_entry_id: string,
    stock_exit_id: string,
    return_id: string,
    amount: number,
    method: string,
    status: string,
    total_amount: number,
    last_amount: number,
    last_method: string
}

export interface IOrder {
    customer_id: Types.ObjectId
    date_ordered?: Date
    status: 'Đang xử lý' | 'Đã giao' | 'Đã hủy'
    total_value: number
    payment?: Types.ObjectId
    orderDetails?: {
        product_id: Types.ObjectId
        quantity: number
        price: number
    }[]
}

export interface ICustomer {
    name: string,
    phone: string,
    address: string,
    avatar: string,
    email: string,
    password: string
}
