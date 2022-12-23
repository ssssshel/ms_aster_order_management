import { DataTypes } from 'sequelize'
import { sequelize } from '../db/dbConnection'

import { GlobalProductModel } from './global_products.model'
import { ProductColorModel } from './product_colors.model'
import { ProductSizeModel } from './product_sizes.model'

export const IndividualProductModel = sequelize.define(
  "individual_products", {
    id_individual_product:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_stock:{
      type:  DataTypes.INTEGER
    },
    // product_color: {
    //   type: DataTypes.STRING
    // },
    product_price: {
      type: DataTypes.INTEGER
    },
    product_sku:{
      type: DataTypes.STRING
    },
    product_url_img: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    has_offer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    percent_discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    timestamps: false
  }
)

// id_global_product
IndividualProductModel.belongsTo(GlobalProductModel, {
  foreignKey: 'id_global_product',
  targetKey: 'id_global_product'
})

GlobalProductModel.hasMany(IndividualProductModel, {
  foreignKey: 'id_global_product',
  sourceKey: 'id_global_product'
})

// id_product_size
IndividualProductModel.belongsTo(ProductSizeModel, {
  foreignKey: 'id_product_size',
  targetKey: 'id_product_size'
})

ProductSizeModel.hasMany(IndividualProductModel, {
  foreignKey: 'id_product_size',
  sourceKey: 'id_product_size'
})

//id_product_color
IndividualProductModel.belongsTo(ProductColorModel, {
  foreignKey: 'id_product_color',
  targetKey: 'id_product_color'
})

ProductColorModel.hasMany(IndividualProductModel, {
  foreignKey: 'id_product_color',
  sourceKey: 'id_product_color'
})