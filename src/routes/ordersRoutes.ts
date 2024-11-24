
import express from "express";
import { createOrder, calculateTotalRevenue } from "../controllers/orderControllers";

const orderRoute = express.Router();

orderRoute.post("/", createOrder);
orderRoute.get("/revenue", calculateTotalRevenue);

export default orderRoute;
