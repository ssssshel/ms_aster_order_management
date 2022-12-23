import mongoose from "mongoose";

const ProductsOnOrderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true },
  userId: { type: Number, required: true },
  products: {
    type: Array
  }
})

export default mongoose.models.ProductsOnOrder || mongoose.model("ProductsOnOrder", ProductsOnOrderSchema)