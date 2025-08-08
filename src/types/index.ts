export interface User {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'staff';
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'partial' | 'paid';
  orderDate: string;
  deliveryDate?: string;
  notes?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface IntegrationSettings {
  whatsapp: {
    enabled: boolean;
    businessNumber: string;
    apiKey: string;
  };
  telegram: {
    enabled: boolean;
    botToken: string;
    chatId: string;
  };
}