import fetch from "node-fetch";
import { config } from "../utils/config";
import { IGenericInternalResponse } from "../utils/interfaces";

export async function ResetCartService(userId: number, token: string): Promise<IGenericInternalResponse> {

  const url = config.MS_SHOPPING_CART + "/update-cart/" + userId
  const body = {
    payload: []
  }

  const updateCartAction: IGenericInternalResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  }).then((res: any) => {
    if (res.error) {
      return {
        data: res.serverMessage,
        error: true,
        success: false
      }
    }
    return {
      data: res.serverMessage,
      error: false,
      success: true
    }
  }).catch((e) => {
    return {
      data: e,
      error: true,
      success: false
    }
  })

  console.log(updateCartAction)
  return updateCartAction

}