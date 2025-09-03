import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

interface EcommerceState {
  products: Product[];
  cartItems: CartItem[];
  orders: Order[];
  loading: boolean;
  error: string | null;
}

type EcommerceAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_ORDER'; payload: Order };

const initialState: EcommerceState = {
  products: [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      description: 'Premium wireless headphones with noise cancellation',
      category: 'Electronics',
      rating: 4.5,
      reviews: 128,
      inStock: true,
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      description: 'Advanced fitness tracking and smart notifications',
      category: 'Electronics',
      rating: 4.3,
      reviews: 89,
      inStock: true,
    },
    {
      id: '3',
      name: 'Laptop Backpack',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      description: 'Durable laptop backpack with multiple compartments',
      category: 'Accessories',
      rating: 4.7,
      reviews: 45,
      inStock: true,
    },
    {
      id: '4',
      name: 'Bluetooth Speaker',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
      description: 'Portable Bluetooth speaker with rich sound',
      category: 'Electronics',
      rating: 4.4,
      reviews: 167,
      inStock: false,
    },
    {
      id: '5',
      name: 'Gaming Mouse',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
      description: 'High-precision gaming mouse with RGB lighting',
      category: 'Gaming',
      rating: 4.6,
      reviews: 203,
      inStock: true,
    },
    {
      id: '6',
      name: 'Wireless Charger',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
      description: 'Fast wireless charging pad for smartphones',
      category: 'Accessories',
      rating: 4.2,
      reviews: 76,
      inStock: true,
    },
  ],
  cartItems: [],
  orders: [
    {
      id: 'ORD-001',
      items: [
        { id: '1', name: 'Wireless Headphones', price: 299.99, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
      ],
      total: 299.99,
      status: 'delivered',
      date: '2024-01-15',
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        zipCode: '10001',
        country: 'United States',
      },
    },
    {
      id: 'ORD-002',
      items: [
        { id: '2', name: 'Smart Watch', price: 399.99, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
        { id: '5', name: 'Gaming Mouse', price: 59.99, quantity: 2, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop' },
      ],
      total: 519.97,
      status: 'shipped',
      date: '2024-01-20',
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        zipCode: '10001',
        country: 'United States',
      },
    },
  ],
  loading: false,
  error: null,
};

function ecommerceReducer(state: EcommerceState, action: EcommerceAction): EcommerceState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            quantity: 1,
            image: action.payload.image,
          },
        ],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
        cartItems: [],
      };
    default:
      return state;
  }
}

const EcommerceContext = createContext<{
  state: EcommerceState;
  dispatch: React.Dispatch<EcommerceAction>;
} | null>(null);

export const EcommerceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ecommerceReducer, initialState);

  return (
    <EcommerceContext.Provider value={{ state, dispatch }}>
      {children}
    </EcommerceContext.Provider>
  );
};

export const useEcommerce = () => {
  const context = useContext(EcommerceContext);
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }

  const { state, dispatch } = context;

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addOrder = (order: Order) => {
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  const cartTotal = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return {
    ...state,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addOrder,
    cartTotal,
  };
};