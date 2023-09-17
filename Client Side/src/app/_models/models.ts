export interface Product{
    id: number,
    name: string,
    description: string,
    price: string,
    stock: number,
    image: string,
    category: string,
    status: string,
    created_at: string,
    updated_at: string
  }
    
  export interface User {
      name: string;
      email: string;
      phone: string;
      address: string;
      is_admin: boolean;
      updated_at: string;
      created_at: string;
      id: number;
  }
  

  export interface UserToken {
    user: {
      name: string;
      email: string;
      phone: string;
      address: string;
      is_admin: boolean;
      updated_at: string;
      created_at: string;
      id: number;
    }
    token: string;
  }