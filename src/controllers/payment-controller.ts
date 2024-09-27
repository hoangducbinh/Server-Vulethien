import { Request, Response } from 'express';

import mongoose from 'mongoose';
import PaymentModel from '../models/payment-models';
import StockEntryModel from '../models/stockEntry-models';
import StockExitModel from '../models/stockExit-models';


  // Tạo một khoản thanh toán mới
  export const createPayment = async (req: Request, res: Response) => {
    try {
      const { amount, method, status, stock_entry_id, stock_exit_id, return_id } = req.body;

      const newPayment = new PaymentModel({
        amount,
        method,
        status,
        date: new Date(),
        stock_entry_id: stock_entry_id || undefined,
        stock_exit_id: stock_exit_id || undefined,
        return_id: return_id || undefined,
      });

      const savedPayment = await newPayment.save();

      // Cập nhật các mô hình liên quan
      if (stock_entry_id) {
        await StockEntryModel.findByIdAndUpdate(stock_entry_id, { $push: { payment: savedPayment._id } });
      }
      if (stock_exit_id) {
        await StockExitModel.findByIdAndUpdate(stock_exit_id, { $push: { payment: savedPayment._id } });
      }

      res.status(201).json({ message: 'Tạo khoản thanh toán thành công', savedPayment });
    } catch (error) {
      res.status(400).json({ message: 'Lỗi khi tạo khoản thanh toán', error });
    }
  }

  // Lấy tất cả các khoản thanh toán
  export const getAllPayments = async (req: Request, res: Response) => {
    try {
      const payments = await PaymentModel.find()
        .populate('stock_entry_id', 'supplier_id warehouse_id')
        .populate('stock_exit_id', 'customer_id warehouse_id')
        .populate('return_id', 'order_id customer_id');
      res.status(200).json(payments);
    } catch (error) {
      res.status(400).json({ message: 'Lỗi khi lấy danh sách thanh toán', error });
    }
  }

  // Lấy một khoản thanh toán theo ID
  export const getPaymentById = async (req: Request, res: Response) => {
    try {
      const payment = await PaymentModel.findById(req.params.id)
        .populate('stock_entry_id', 'supplier_id warehouse_id')
        .populate('stock_exit_id', 'customer_id warehouse_id')
        .populate('return_id', 'order_id customer_id');
      if (!payment) {
        return res.status(404).json({ message: 'Không tìm thấy khoản thanh toán' });
      }
      res.status(200).json(payment);
    } catch (error) {
      res.status(400).json({ message: 'Lỗi khi lấy thông tin thanh toán', error });
    }
  }

  // Cập nhật một khoản thanh toán
  export const updatePayment = async (req: Request, res: Response) => {
    try {
      const { amount, method, status, stock_entry_id, stock_exit_id, return_id, last_amount, last_method, total_amount } = req.body;

      const updatedPayment = await PaymentModel.findByIdAndUpdate(
        req.params.id,
        {
          amount,
          method,
          status,
          last_amount,
          last_method,
          total_amount,
          stock_entry_id: stock_entry_id || undefined,
          stock_exit_id: stock_exit_id || undefined,
          return_id: return_id || undefined,
        },
        { new: true, runValidators: true }
      );

      if (!updatedPayment) {
        return res.status(404).json({ message: 'Không tìm thấy khoản thanh toán' });
      }

      res.status(200).json(updatedPayment);
    } catch (error) {
      res.status(400).json({ message: 'Lỗi khi cập nhật thanh toán', error });
    }
  }

  // Xóa một khoản thanh toán
  export const deletePayment = async (req: Request, res: Response) => {
    try {
      const deletedPayment = await PaymentModel.findByIdAndDelete(req.params.id);
      if (!deletedPayment) {
        return res.status(404).json({ message: 'Không tìm thấy khoản thanh toán' });
      }

      // Xóa tham chiếu thanh toán từ các mô hình liên quan
      if (deletedPayment.stock_entry_id) {
        await StockEntryModel.findByIdAndUpdate(deletedPayment.stock_entry_id, { $pull: { payment: deletedPayment._id } });
      }
      if (deletedPayment.stock_exit_id) {
        await StockExitModel.findByIdAndUpdate(deletedPayment.stock_exit_id, { $pull: { payment: deletedPayment._id } });
      }

      res.status(200).json({ message: 'Đã xóa khoản thanh toán thành công' });
    } catch (error) {
      res.status(400).json({ message: 'Lỗi khi xóa thanh toán', error });
    }
  }
  // Lấy các khoản thanh toán theo nhập kho
  export const getPaymentsByStockEntry = async (req: Request, res: Response) => {
    try {
      const payments = await PaymentModel.find({ stock_entry_id: req.params.stockEntryId });
      res.status(200).json(payments);
    } catch (error) {
      res.status(400).json({ message: 'Lỗi khi lấy thanh toán theo nhập kho', error });
    }
  }
  // Lấy các khoản thanh toán theo xuất kho
  export const getPaymentsByStockExit = async (req: Request, res: Response) => {
    try {
      const payments = await PaymentModel.find({ stock_exit_id: req.params.stockExitId });
      res.status(200).json(payments);
    } catch (error) {
      res.status(400).json({ message: 'Lỗi khi lấy thanh toán theo xuất kho', error });
    }
  }

  // Lấy các khoản thanh toán theo trả hàng
  export const getPaymentsByReturn = async (req: Request, res: Response) => {
    try {
      const payments = await PaymentModel.find({ return_id: req.params.returnId });
      res.status(200).json(payments);
    } catch (error) {
      res.status(400).json({ message: 'Lỗi khi lấy thanh toán theo trả hàng', error });
    }
  }
