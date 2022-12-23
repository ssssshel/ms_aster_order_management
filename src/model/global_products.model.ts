import { DataTypes } from 'sequelize'
import { sequelize } from '../db/dbConnection'
import { ProductCategoryModel } from './product_categories.model'
import { ProductCollectionModel } from './product_collections.model'
import { ProductMaterialModel } from './product_materials.model'
import { ProductSeasonModel } from './product_seasons.model'

export const GlobalProductModel = sequelize.define(
  "global_products", {
    id_global_product:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_url_code: {
      type: DataTypes.UUIDV4
    },
    product_name:{
      type: DataTypes.STRING
    }
  },
  {
    timestamps: false
  }
)

// id_product_collection
GlobalProductModel.belongsTo(ProductCollectionModel, {
  foreignKey: 'id_product_collection',
  targetKey: 'id_product_collection',
})

ProductCollectionModel.hasMany(GlobalProductModel,{
  foreignKey: 'id_product_collection',
  sourceKey: 'id_product_collection'
})

// id_product_season
GlobalProductModel.belongsTo(ProductSeasonModel, {
  foreignKey: 'id_product_season',
  targetKey: 'id_product_season'
})

ProductSeasonModel.hasMany(GlobalProductModel, {
  foreignKey: 'id_product_season',
  sourceKey: 'id_product_season'
})

// id_product_material
GlobalProductModel.belongsTo(ProductMaterialModel, {
  foreignKey: 'id_product_material',
  targetKey: 'id_product_material'
})

ProductMaterialModel.hasMany(GlobalProductModel, {
  foreignKey: 'id_product_material',
  sourceKey: 'id_product_material'
})

// id_product_category
GlobalProductModel.belongsTo(ProductCategoryModel, {
  foreignKey: 'id_product_category',
  targetKey: 'id_product_category'
})

ProductCategoryModel.hasMany(GlobalProductModel, {
  foreignKey: 'id_product_category',
  sourceKey: 'id_product_category'
})