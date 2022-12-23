import { DataType, DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const ProductColorModel = sequelize.define(
  "product_colors", {
    id_product_color:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_color_name:{
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
)