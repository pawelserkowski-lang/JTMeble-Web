import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './useCartStore';

export interface Order {
  id: string;
  date: string;
  items: Product[];
  totalNetto: number;
  totalBrutto: number;
  status: 'Oczekujące' | 'W realizacji' | 'Zakończone';
  billingData?: Partial<User>;
  shippingData?: Partial<User>;
  deliveryMethod?: string;
  paymentMethod?: string;
}

export interface User {
  email: string;
  name: string;
  nip?: string;
  companyName?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
}

interface UserStore {
  user: User | null;
  orders: Order[];
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      orders: [],
      isLoggedIn: false,
      login: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false, orders: [] }),
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
    }),
    {
      name: 'jtmeble-user-storage',
    }
  )
);