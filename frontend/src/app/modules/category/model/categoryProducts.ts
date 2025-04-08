import { Page } from "../../../shared/model/page";
import { Product } from "../../product/model/product";
import { Category } from "./category";

export interface CategoryProducts {
  category: Category,
  products: Page<Product>
}
