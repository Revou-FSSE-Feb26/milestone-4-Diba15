export enum role {
  ADMIN = 'admin',
  USER = 'user',
}

export enum accountType {
  CASH = 'cash',
  BANK = 'bank',
  E_WALLET = 'e-wallet',
}

export enum categoryType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export enum transactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER = 'transfer',
}

interface Category {
  id: number;
  name: string;
  type: categoryType;
}

interface Transaction {
  id: number;
  accountId: number;
  categoryId: number;
  type: transactionType;
  amount: number;
  description: string;
  createdAt: string;
}

interface Account {
  id: number;
  userId: number;
  name: string;
  type: accountType;
  balance: number;
  createdAt: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: role;
  createdAt: string;
}

type MockData = {
  categories: Category[];
  transactions: Transaction[];
  accounts: Account[];
  users: User[];
};

// Mock Data

export const mockData: MockData = {
  categories: [
    { id: 1, name: 'Gaji Bulanan', type: categoryType.INCOME },
    { id: 2, name: 'Pendapatan Freelance', type: categoryType.INCOME },
    { id: 3, name: 'Makanan & Minuman', type: categoryType.EXPENSE },
    { id: 4, name: 'Transportasi', type: categoryType.EXPENSE },
    { id: 5, name: 'Tagihan & Utilitas', type: categoryType.EXPENSE },
    { id: 6, name: 'Hiburan & Hobi', type: categoryType.EXPENSE },
  ],
  transactions: [
    {
      id: 1,
      accountId: 1,
      categoryId: 1,
      type: transactionType.DEPOSIT,
      amount: 7500000.0,
      description: 'Gaji PT Tech Nusantara',
      createdAt: new Date('2026-06-25 09:00:00').toISOString(),
    },
    {
      id: 2,
      accountId: 1,
      categoryId: 5,
      type: transactionType.WITHDRAWAL,
      amount: 450000.0,
      description: 'Bayar Listrik & Internet',
      createdAt: new Date('2026-06-26 10:30:00').toISOString(),
    },
    {
      id: 3,
      accountId: 2,
      categoryId: 3,
      type: transactionType.WITHDRAWAL,
      amount: 45000.0,
      description: 'Beli Kopi Susu',
      createdAt: new Date('2026-06-26 15:20:00').toISOString(),
    },
    {
      id: 4,
      accountId: 1,
      categoryId: 4,
      type: transactionType.WITHDRAWAL,
      amount: 200000.0,
      description: 'Isi Bensin Mobil',
      createdAt: new Date('2026-06-28 08:00:00').toISOString(),
    },
    {
      id: 5,
      accountId: 2,
      categoryId: 3,
      type: transactionType.TRANSFER,
      amount: 85000.0,
      description: 'Makan Siang Nasi Padang',
      createdAt: new Date('2026-06-29 12:15:00').toISOString(),
    },
    {
      id: 6,
      accountId: 2,
      categoryId: 6,
      type: transactionType.WITHDRAWAL,
      amount: 120000.0,
      description: 'Tiket Bioskop Weekend',
      createdAt: new Date('2026-07-04 19:00:00').toISOString(),
    },
    {
      id: 7,
      accountId: 1,
      categoryId: 3,
      type: transactionType.WITHDRAWAL,
      amount: 1150000.0,
      description: 'Belanja Bulanan Supermarket',
      createdAt: new Date('2026-07-05 11:00:00').toISOString(),
    },
  ],
  accounts: [
    {
      id: 1,
      userId: 1,
      name: 'BCA Personal',
      type: accountType.BANK,
      balance: 5450000.0,
      createdAt: new Date('2026-05-01 08:30:00').toISOString(),
    },
    {
      id: 2,
      userId: 1,
      name: 'GoPay Rian',
      type: accountType.E_WALLET,
      balance: 350000.0,
      createdAt: new Date('2026-05-01 08:45:00').toISOString(),
    },
    {
      id: 3,
      userId: 2,
      name: 'Mandiri Utama',
      type: accountType.BANK,
      balance: 12150000.0,
      createdAt: new Date('2026-05-03 09:30:00').toISOString(),
    },
    {
      id: 4,
      userId: 2,
      name: 'Dompet Tunai',
      type: accountType.CASH,
      balance: 450000.0,
      createdAt: new Date('2026-05-03 09:40:00').toISOString(),
    },
    {
      id: 5,
      userId: 3,
      name: 'BNI Bisnis',
      type: accountType.BANK,
      balance: 27300000.0,
      createdAt: new Date('2026-05-01 07:45:00').toISOString(),
    },
    {
      id: 6,
      userId: 3,
      name: 'OVO Budi',
      type: accountType.E_WALLET,
      balance: 850000.0,
      createdAt: new Date('2026-05-01 07:50:00').toISOString(),
    },
  ],
  users: [
    {
      id: 1,
      name: 'Rian Wijaya',
      email: 'rian.wijaya@email.com',
      password: 'rian123',
      role: role.USER,
      createdAt: new Date('2026-05-01 08:00:00').toISOString(),
    },
    {
      id: 2,
      name: 'Siti Aminah',
      email: 'siti.aminah@email.com',
      password: 'siti456',
      role: role.USER,
      createdAt: new Date('2026-05-03 09:15:00').toISOString(),
    },
    {
      id: 3,
      name: 'Budi Santoso',
      email: 'budi.admin@email.com',
      password: 'budi789',
      role: role.ADMIN,
      createdAt: new Date('2026-05-01 07:30:00').toISOString(),
    },
  ],
};
