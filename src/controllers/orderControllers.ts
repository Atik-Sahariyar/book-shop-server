import { Request, Response } from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import { sendErrorResponse } from "../utils/sendErrorResponse";

// Controller: Create a New Order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, product, quantity, totalPrice } = req.body;

    // Validate the product exists
    const productDetails = await Product.findById(product);
    if (!productDetails) {
      res.status(404).json({ message: "Product not found", success: false });
      return;
    }

    // Create and save the order
    const order = new Order({
      email,
      product,
      quantity,
      totalPrice,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order created successfully",
      success: true,
      data: savedOrder,
    });
  } catch (error: any) {
    sendErrorResponse(res, 500, "Server error", error.message || "Unknown error");
  }
};

// Controller: Calculate Total Revenue
export const calculateTotalRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json({
      message: "Revenue calculated successfully",
      success: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    sendErrorResponse(res, 500, "Server error", error.message || "Unknown error");
  }
};
