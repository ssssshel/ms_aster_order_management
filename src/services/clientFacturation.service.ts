import Stripe from "stripe"
import { config } from "../utils/config"
import { IGenericInternalResponse } from "../utils/interfaces"

const sk = config.STRIPE_SECRET_KEY!
const stripe = new Stripe(sk, { apiVersion: "2022-11-15", typescript: true })


export async function ClientFacturationService(amount: number, paymentMethodId: string): Promise<IGenericInternalResponse> {
  const paymentAction = await stripe.paymentIntents.create({
    amount: amount,
    currency: "PEN",
    // customer: "",
    description: "Compra hecha en Asterisks",
    payment_method: paymentMethodId,
    confirm: true
  }).then((res) => {
    console.log({ res })
    return {
      success: true,
      error: false,
      data: res
    }
  }).catch((err) => {
    return {
      success: false,
      error: true,
      data: err
    }
  })

  return paymentAction
}