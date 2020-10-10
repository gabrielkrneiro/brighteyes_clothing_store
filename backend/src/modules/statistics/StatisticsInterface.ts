import { Client } from "../client/Client";
import { ClothesStatus } from "../clothes_status/ClothesStatus";

interface ShoppingCartValuable {
    shoppingCartId: number
    value: number
}

interface ClientValuable {
    client: Client
    value: number
}

interface ClothesAvailabilityMetrics {
    status: ClothesStatus
    quantity: number
}