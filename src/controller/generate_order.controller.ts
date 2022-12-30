import { Response } from "express";
import { Sequelize } from "sequelize";
import { UserOrderModel, IndividualProductModel } from "../model";
import { ResetCartService } from "../services/cartReset.service";
import { ClientFacturationService } from "../services/clientFacturation.service";
import { GetProductsData } from "../services/getProductsData.service";
import { UpdateStocksService } from "../services/updateStocks.service";
import {
  GenericServiceErrorResponse,
  GenericServiceResponse,
} from "../utils/interfaces";
import { status201Created, status400BadRequest, status412PreconditionFailed, status500InternalServerError } from "../utils/methods";

const model = UserOrderModel
const resourceName = "user_order"

export async function GenerateOrderController(
  req: any,
  res: Response<GenericServiceResponse | GenericServiceErrorResponse>
) {
  const { id_user, products, shipping_address, delivery_date, final_price, payment_method, shipping_price } = req.body
  console.log(req.body)

  const accessToken: string = req.headers.authorization
  const cAccessToken = accessToken.replace("Bearer ", "")


  const id_order_state = 2
  // const currentDate = new Date()
  const order_date = new Date().toLocaleString('en-US', { hour12: true })
  // const delivery_date = new Date(new Date(currentDate).setDate(currentDate.getDate() + 11)).toLocaleString()

  // console.log({ order_date, delivery_date })

  if (!products || products.length == 0) {
    return res.status(400).json(status400BadRequest("Products array is invalid"))
  }

  const productIds = extractIds(products)
  // console.log({ productIds })

  try {

    // se llama al servicio getProducts para obtener informacion detallada de los productos en el carrito
    const productsDataResponse = await GetProductsData(productIds, "dd")
    if (productsDataResponse.error) {
      return res.status(500).json(status500InternalServerError(productsDataResponse.content))
    }
    const productsArray = productsDataResponse.content.responseBody

    // se llama al metodo extractProductsData para calcular precios y cantidades
    const { productsData, totalPrice, totalPriceWdisc, totalQuantity } = await extractProductsData(productsArray, products, shipping_price)
    // console.log({ productsData, totalPrice, totalPriceWdisc, totalQuantity })

    // se valida que el precio del front y back sea el mismo
    if (final_price != totalPriceWdisc) {
      return res.status(412).json(status412PreconditionFailed("final price", "final price w discounts from client is not same that final price from server"))
    }

    // console.log({
    //   id_user,
    //   id_order_state,
    //   total_price: totalPrice,
    //   total_price_wdisc: totalPriceWdisc,
    //   order_date,
    //   delivery_date,
    //   total_items_quantity: totalQuantity,
    //   products: productsData,
    //   shipping_address,
    //   shipping_price
    // })
    // se genera la orden
    const newOrder = await model.create({
      id_user,
      id_order_state,
      total_price: totalPrice,
      total_price_wdisc: totalPriceWdisc,
      order_date: order_date,
      delivery_date,
      total_items_quantity: totalQuantity,
      products: productsData,
      shipping_address,
      shipping_price,
      id_transaction_pay: "-"
    }).then(async (res) => {

      console.log({ res })
      // se factura la orden al cliente
      const billingAction = await ClientFacturationService(totalPrice, payment_method.id)
      if (billingAction.error) {
        // si la facturacion falla, se actualiza el estado de la orden a cancelado
        await model.update({ id_order_state: 3 }, { where: { id_user_order: res.dataValues.id_user_order } }).then(() => {
          // para el futuro se debe habilitar un almacenamiento del logging generado
          console.log(`El pago falló, no se actualizó el estado de la orden con id: ${res.dataValues.id_user_order} a: 3 (Cancelado) `)
          throw new Error(`${billingAction.data}`);
        })
      } else {
        await model.update({ id_transaction_pay: billingAction.data.id }, { where: { id_user_order: res.dataValues.id_user_order } }).then(() => {
          // para el futuro se debe habilitar un almacenamiento del logging generado
          console.log(`El pago se realizó con éxito, s/e no se actualizó el id_transaction_pay de la orden con id: ${res.dataValues.id_user_order} a: ${billingAction.data.id}`)
        })

        // si la facturacion no falla
        // se actualiza el stock de cada uno de los productos ordenados || TALON DE AQUILES OJO
        const updateStockAction = await UpdateStocksService(productsData)

        // finalmente se vacía el carrito de compras actual
        const updateCartAction = await ResetCartService(id_user, cAccessToken)

      }


    }).catch((err) => { throw new Error(`${err}`) })

    return res.status(201).json(status201Created(newOrder, resourceName, "Your order has been succesfully registered"))

  } catch (error) {
    return res.status(500).json(status500InternalServerError(`${error}`))

  }
}

function extractIds(products: any[]) {
  let ids: number[] = []

  products.map(({ individual_id }) => {
    ids.push(individual_id)
  })

  return ids
}

interface IExtractPD {
  productsData: any[]
  totalPrice: number
  totalPriceWdisc: number
  totalQuantity: number
}
async function extractProductsData(products: any[], selectedProducts: any[], shipping_price: number): Promise<IExtractPD> {
  let productsData: any[] = []
  let prices: number[] = [shipping_price]
  let pricesWdisc: number[] = [shipping_price]
  let quantities: number[] = []
  let totalPrice: number
  let totalPriceWdisc: number
  let totalQuantity: number

  products.map((product) => {
    let selectedProduct = selectedProducts.find((p) => p.individual_id == product.id_individual_product)
    let data = {
      id_individual_product: product.id_individual_product,
      id_global_product: product.id_global_product,
      product_size: {
        id: product.product_size.id,
        name: product.product_size.name
      },
      // product_stock: product.product_stock,
      product_color: {
        id: product.product_color.id,
        name: product.product_color.name
      },
      product_sku: product.product_sku,
      product_url_img: product.product_url_img[0],
      has_offer: product.has_offer,
      product_quantity: selectedProduct.quantity,
      percent_discount: product.percent_discount,
      individual_product_price: Number(product.product_price),
      individual_product_price_wdisc: product.has_offer && product.percent_discount > 0 ? Number(product.product_price * ((100 - product.percent_discount) * 0.01)) : Number(product.product_price),
      final_price: Number(product.product_price * selectedProduct.quantity),
      final_price_wdisc: product.has_offer && product.percent_discount > 0 ? Number(product.product_price * ((100 - product.percent_discount) * 0.01) * selectedProduct.quantity) : Number(product.product_price * selectedProduct.quantity),
    }
    // console.log(selectedProduct.quantity)
    if (product.product_stock >= selectedProduct.quantity && product.product_stock > 0) {
      productsData.push(data)
      prices.push(Number(product.product_price) * selectedProduct.quantity)
      pricesWdisc.push(Number(product.product_price * ((100 - product.percent_discount) * 0.01) * selectedProduct.quantity))
      quantities.push(Number(selectedProduct.quantity))
    } else {
      throw new Error(`Product with individual_id ${product.id_individual_product} has insufficient stock: ${product.product_stock}`);

    }
  })

  totalPrice = prices.reduce((a, b) => a + b, 0)
  totalPriceWdisc = pricesWdisc.reduce((a, b) => a + b, 0)
  totalQuantity = quantities.reduce((a, b) => a + b, 0)
  // console.log({ productsData })
  return { productsData, totalPrice, totalPriceWdisc, totalQuantity }
}