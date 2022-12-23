import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const  ProductMaterialModel = sequelize.define(
  "product_materials", {
    id_product_material: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_material_name: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
)