import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    }
})

const CategoryModel = mongoose.model('Category', categorySchema)


const customerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    contact_info: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    }

})


const CustomerModel = mongoose.model('Customer', customerSchema)

const paymentSchema = new Schema({
    amount :{
        type: Number,
        required: true
    },
    method:{
        type: String,
        enum: ['Tiền mặt','Chuyển khoản'],
        required: true
    },
    status:{
        type: String,
        enum: ['Đã thanh toán đủ', 'Còn nợ']
    },
    date:{
        type: Date,
        default: Date.now
    },
    stock_entry_id:{
        type: Schema.Types.ObjectId,
        ref: 'StockEntry'
    },
    stock_exit_id:{
        type: Schema.Types.ObjectId,
        ref: 'StockExit'
    },
    return_id: {
        type: Schema.Types.ObjectId,
        ref: 'Return',
        required: false
    }
})

const PaymentModel = mongoose.model('Payment', paymentSchema)

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    category_id:{
        type: Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    },
    unit_price:{
        type: Number,
        required: true
    },
    import_price:{
        type: Number,
        required: true
    },
    quantity_in_stock:{
        type: Number,
        required: true
    },
    reorder_level:{
        type: Number,
    }
})


const ProductModel = mongoose.model('Product', productSchema)

const stockEntrySchema = new Schema({
    supplier_id:{
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    warehouse_id:{
        type: Schema.Types.ObjectId,
        ref:'Warehouse',
        required: true
    },
    date_received: {
        type: Date,
        default: Date.now
    },
    total_value:{
        type: Number,
        required: true
    },
    payment: [{
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    }]
    
})

const StockEntryModel = mongoose.model('StockEntry', stockEntrySchema)

const stockEntryDetailSchema = new Schema({
    stock_entry_id:{
        type: Schema.Types.ObjectId,
        ref: 'StockEntry',
        required: true
    },
    product_id:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity_received:{
        type: Number,
        required: true
    },
    quantity_ordered:{
        type: Number,
        required: true
    },
})

const StockEntryDetailModel = mongoose.model('StockEntryDetail' ,stockEntryDetailSchema)

const stockExitSchema = new Schema({
    customer_id :{
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    warehouse_id:{
        type: Schema.Types.ObjectId,
        ref: 'Warehouse',
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    total_value:{
        type: Number,
        required: true
    },
    payment: [{
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    }],
    returns: [{
        type: Schema.Types.ObjectId,
        ref: 'Return'
    }]
})

const StockExitModel = mongoose.model('StockExit', stockExitSchema)

const stockExitDetailSchema = new Schema({
    stock_exit_id:{
        type: Schema.Types.ObjectId,
        ref: 'StockExit',
        required: true
    },
    product_id:{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity_received:{
        type: Number,
        required: true
    },
    quantity_ordered:{
        type: Number,
        required: true
    },
})


const StockExitDetailModel = mongoose.model('StockExitDetail', stockExitDetailSchema)

const supplierSchema = new Schema(
    {
        name:{
            type: String,
            required:true
        },
        contact_info:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        }

    }
)


const SupplierModel = mongoose.model('Supplier', supplierSchema)

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ['admin', 'nhân viên kho', 'nhân viên giao hàng'],
        required: false,
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
    updated_at:{
        type: Date,
        default: Date.now,
    },
    avatar: {
        type: String,
        required: false
    }
})


const UserModel = mongoose.model("User", userSchema);

const warehouseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    }
})

const WarehouseModel = mongoose.model('Warehouse', warehouseSchema)

const deliverySchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    delivery_staff_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming 'User' represents both employees and delivery staff
        required: true
    },
    delivery_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Đang giao', 'Đã giao', 'Thất bại'],
        required: true
    },
    notes: {
        type: String
    }
})

const DeliveryModel = mongoose.model('Delivery', deliverySchema);

const orderSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    date_ordered: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Đang xử lý', 'Đã giao', 'Đã hủy'],
        required: true
    },
    total_value: {
        type: Number,
        required: true
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: 'Payment'
    }
})

const OrderModel = mongoose.model('Order', orderSchema);

const orderDetailSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const OrderDetailModel = mongoose.model('OrderDetail', orderDetailSchema);

const invoiceSchema = new Schema({
    invoice_number: {
        type: String,
        required: true,
        unique: true
    },
    stock_entry_id: {
        type: Schema.Types.ObjectId,
        ref: 'StockEntry'
    },
    stock_exit_id: {
        type: Schema.Types.ObjectId,
        ref: 'StockExit'
    },
    date: {
        type: Date,
        default: Date.now
    },
    total_amount: {
        type: Number,
        required: true
    }
})

const InvoiceModel = mongoose.model('Invoice', invoiceSchema);


const returnSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    return_date: {
        type: Date,
        default: Date.now
    },
    items: [{
        product_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        reason: {
            type: String,
            required: false
        }
    }],
    status: {
        type: String,
        enum: ['Đã xử lý', 'Chưa xử lý', 'Đã hoàn tất'],
        default: 'Chưa xử lý'
    },
    refund_amount: {
        type: Number,
        required: true
    },
    refund_date: {
        type: Date,
        required: false
    }
});


const ReturnModel = mongoose.model('Return', returnSchema);

// export {
//     UserModel,
//     WarehouseModel,
//     StockEntryDetailModel,
//     StockEntryModel,
//     StockExitDetailModel,
//     StockExitModel,
//     SupplierModel,
//     ProductModel,
//     CategoryModel,
//     PaymentModel,
//     CustomerModel,
//     DeliveryModel,
//     OrderModel,
//     OrderDetailModel,
//     InvoiceModel,
//     ReturnModel
// }
