
import { Sequelize } from "sequelize"
import { IndividualProductModel } from "../model"
export async function UpdateStocksService(productsData: any[]) {

  // para el futuro se debe habilitar un almacenamiento del logging generado al no actualzarse un stock
  // de esta forma se podrá tener un registro de las fallas para poder actualizarlas manualmente o mediante una automatizacion
  productsData.forEach(async (product) => {
    await IndividualProductModel.update({ product_stock: Sequelize.literal(`product_stock - ${product.product_quantity}`) }, {
      where: { id_individual_product: product.id_individual_product }
    }).catch(e => { console.log(`No se actualizo el stock del producto con ID ${product.id_individual_product}, cantidad comprada: ${product.product_quantity}`) })
  })
}