import { Departament } from "./departament";
export interface Product {
  name: string;
  departament: Departament[];
  stock: number;
  price: number;
  _id?: string;
}
