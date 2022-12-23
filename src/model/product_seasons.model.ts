import { DataTypes } from "sequelize";
import { sequelize } from "../db/dbConnection";

export const  ProductSeasonModel = sequelize.define(
  "product_seasons", {
    id_product_season: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_season_name: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
)