import { Client } from './../client/client.interfaces';
import { Employee } from './../employee/employee.models';

interface ShoppingCart {
  id: number;
  client: Client;
  cashier?: Employee;
  seller: Employee;
  status: ShoppingCartStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface ShoppingCartStatus {
  id: number;
  name: ShoppingCartEnum;
}

enum ShoppingCartEnum {
  IN_PROGRESS = 'IN PROGRESS',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

export { ShoppingCart, ShoppingCartStatus };
