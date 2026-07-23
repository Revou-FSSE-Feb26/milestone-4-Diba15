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

// Mock Data

export const mockData = {
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
      type: categoryType.INCOME,
      amount: 7500000.0,
      description: 'Gaji PT Tech Nusantara',
      createdAt: '2026-06-25 09:00:00',
    },
    {
      id: 2,
      accountId: 1,
      categoryId: 5,
      type: categoryType.EXPENSE,
      amount: 450000.0,
      description: 'Bayar Listrik & Internet',
      createdAt: '2026-06-26 10:30:00',
    },
    {
      id: 3,
      accountId: 2,
      categoryId: 3,
      type: categoryType.EXPENSE,
      amount: 45000.0,
      description: 'Beli Kopi Susu',
      createdAt: '2026-06-26 15:20:00',
    },
    {
      id: 4,
      accountId: 1,
      categoryId: 4,
      type: categoryType.EXPENSE,
      amount: 200000.0,
      description: 'Isi Bensin Mobil',
      createdAt: '2026-06-28 08:00:00',
    },
    {
      id: 5,
      accountId: 2,
      categoryId: 3,
      type: categoryType.EXPENSE,
      amount: 85000.0,
      description: 'Makan Siang Nasi Padang',
      createdAt: '2026-06-29 12:15:00',
    },
    {
      id: 6,
      accountId: 2,
      categoryId: 6,
      type: categoryType.EXPENSE,
      amount: 120000.0,
      description: 'Tiket Bioskop Weekend',
      createdAt: '2026-07-04 19:00:00',
    },
    {
      id: 7,
      accountId: 1,
      categoryId: 3,
      type: categoryType.EXPENSE,
      amount: 1150000.0,
      description: 'Belanja Bulanan Supermarket',
      createdAt: '2026-07-05 11:00:00',
    },
  ],
  accounts: [
    {
      id: 1,
      userId: 1,
      name: 'BCA Personal',
      type: accountType.BANK,
      balance: 5450000.0,
      createdAt: '2026-05-01 08:30:00',
    },
    {
      id: 2,
      userId: 1,
      name: 'GoPay Rian',
      type: accountType.E_WALLET,
      balance: 350000.0,
      createdAt: '2026-05-01 08:45:00',
    },
    {
      id: 3,
      userId: 2,
      name: 'Mandiri Utama',
      type: accountType.BANK,
      balance: 12150000.0,
      createdAt: '2026-05-03 09:30:00',
    },
    {
      id: 4,
      userId: 2,
      name: 'Dompet Tunai',
      type: accountType.CASH,
      balance: 450000.0,
      createdAt: '2026-05-03 09:40:00',
    },
    {
      id: 5,
      userId: 3,
      name: 'BNI Bisnis',
      type: accountType.BANK,
      balance: 27300000.0,
      createdAt: '2026-05-01 07:45:00',
    },
    {
      id: 6,
      userId: 3,
      name: 'OVO Budi',
      type: accountType.E_WALLET,
      balance: 850000.0,
      createdAt: '2026-05-01 07:50:00',
    },
  ],
  users: [
    {
      id: 1,
      name: 'Rian Wijaya',
      email: 'rian.wijaya@email.com',
      password: 'rian123',
      role: role.USER,
      createdAt: '2026-05-01 08:00:00',
    },
    {
      id: 2,
      name: 'Siti Aminah',
      email: 'siti.aminah@email.com',
      password: 'siti456',
      role: role.USER,
      createdAt: '2026-05-03 09:15:00',
    },
    {
      id: 3,
      name: 'Budi Santoso',
      email: 'budi.admin@email.com',
      password: 'budi789',
      role: role.ADMIN,
      createdAt: '2026-05-01 07:30:00',
    },
  ],
};
