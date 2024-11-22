export interface CreateCustomerProps {
  name: string;
  email: string;
  password: string;
  cpf: string;
  cellphone: string;
}

export interface UpdateCustomerProps {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  cellphone?: string;
  status?: boolean;
}

export interface CreateAddressProps {
  user_id: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default?: boolean;
}

export interface CreateCategoryProps {
  name: string;
  description: string;
}

export interface UpdateCategoryProps {
  id: string;
  name: string;
  description: string;
}

export interface InventoryLogProps {
  product_id: string;
  change_type: "Entrada" | "Saída";
  quantity: number;
  note: string;
}

export interface LoginCustomerProps {
  email: string;
  password: string;
}

export interface CreateProductProps {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  brand: string;
  stock: number;
  min_stock: number;
  images: string[];
}

export interface UpdateProductProps {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  categoryId?: string;
  brand?: string;
  stock?: number;
  min_stock?: number;
  images?: string[];
}

export interface ProductInSale {
  product_id: string;
  quantity: number;
  price: number;
}

export interface CreateSaleProps {
  user_id: string;
  products: ProductInSale[];
  payment_status: string;
  shipment_status: string;
  address_id: string;
}

export interface UpdateSaleProps {
  id: string;
  payment_status?: string;
  shipment_status?: string;
}
