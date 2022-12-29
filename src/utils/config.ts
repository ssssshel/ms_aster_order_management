import * as dotenv from 'dotenv'

dotenv.config()

const config = {
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY!,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_PRIVATE_KEY!,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

  MS_AUTHENTICATION_ADMIN_URL: "https://ms-aster-authentication-admin-production.up.railway.app/v1",
  MS_PRODUCTS_INDEX_URL: "https://ms-aster-products-index-production.up.railway.app/v1",
  MS_SHOPPING_CART: "https://ms-aster-shopping-cart-production.up.railway.app/v1"
}

export { config }