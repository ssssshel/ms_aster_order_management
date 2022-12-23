import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const  ProductSizeModel = sequelize.define(
  "product_sizes", {
    id_product_size: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_size_name: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
)