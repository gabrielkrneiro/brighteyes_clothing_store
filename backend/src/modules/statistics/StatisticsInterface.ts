import { Client } from "../client/Client";
import { ClothesStatusEnum } from "../clothes_status/ClothesStatusEnum";
import { EnumEmployeeClientStatus } from "../employee_client_status/IEmployeeClientStatus";

interface ShoppingCartValuable {
    shoppingCartId: number
    value: number
}

interface ClientValuable {
    client: Pick<Client, 'id' | 'name'>
    value: number
}

interface ClientAvailability {
    quantity: number,
    status: EnumEmployeeClientStatus
}

interface ClothesAvailabilityMetrics {
    status: ClothesStatusEnum
    quantity: number
}

export {
    ShoppingCartValuable, 
    ClientValuable, 
    ClothesAvailabilityMetrics,
    ClientAvailability
}