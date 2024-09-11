

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
    reorder_level: number
    _id: string
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