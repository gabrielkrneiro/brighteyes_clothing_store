import { Client, ClientStatusEnum } from './../../client/client.interfaces'
import { ShoppingCart } from './../../shopping-cart/shopping-cart.interface'

interface ShoppingCartValuable {
    shoppingCartId: Pick<ShoppingCart, 'id'>
    value: number
}

interface ClientValuable {
    client: Pick<Client, 'id' | 'name'>
    value: number
}

interface ClothesAvailabilityMetrics {
    status: string
    quantity: number
}

interface ClientAvailability {
    quantity: number,
    status: ClientStatusEnum
}

interface StatisticsResponse {
    
    number_of_shopping_carts_created_current_month: number,
    shopping_cart_rank: ShoppingCartValuable[],
    customer_rank: ClientValuable[],
    clothes_availability_quantity: ClothesAvailabilityMetrics[],
    client_availability_quantity: ClientAvailability[]
  
  }

export {
    ShoppingCartValuable, 
    ClientValuable, 
    ClothesAvailabilityMetrics,
    ClientAvailability,
    StatisticsResponse
}