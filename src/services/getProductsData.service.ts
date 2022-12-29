import { config } from "../utils/config";
import fetch from "node-fetch"
export async function GetProductsData(products: number[], accessToken: string) {
  const url = config.MS_PRODUCTS_INDEX_URL + "/products/individuals/multiple"
  const body = {
    individuals: products
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    if (!response) {
      return { error: true, content: "Invalid request" }
    }

    const res: any = await response.json()
    // console.log(res)

    if (res.error) {
      return { error: true, content: res.serverMessage }
    }

    return { error: false, content: res }


  } catch (error) {
    return { error: true, content: `${error}` }

  }
}