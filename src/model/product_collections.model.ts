import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const ProductCollectionModel = sequelize.define(
  "product_collection", {
    id_product_collection: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_collection_name: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
)