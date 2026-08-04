import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  PrismaClient,
  Role,
  AccountType,
  CategoryType,
  TransactionType,
} from '../src/generated/prisma/client';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
const adapter = new PrismaPg({ connectionString: connectionString! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Clean existing data in order of foreign key dependencies
  await prisma.transaction.deleteMany();
  await prisma.account.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing data');

  // 2. Hash passwords for seeded users
  const rianPassword = await bcrypt.hash('rian123', 10);
  const sitiPassword = await bcrypt.hash('siti456', 10);
  const budiPassword = await bcrypt.hash('budi789', 10);

  // 3. Seed Users
  const userRian = await prisma.user.create({
    data: {
      name: 'Rian Wijaya',
      email: 'rian.wijaya@email.com',
      password: rianPassword,
      role: Role.USER,
      createdAt: new Date('2026-05-01T08:00:00.000Z'),
    },
  });

  const userSiti = await prisma.user.create({
    data: {
      name: 'Siti Aminah',
      email: 'siti.aminah@email.com',
      password: sitiPassword,
      role: Role.USER,
      createdAt: new Date('2026-05-03T09:15:00.000Z'),
    },
  });

  const userBudi = await prisma.user.create({
    data: {
      name: 'Budi Santoso',
      email: 'budi.admin@email.com',
      password: budiPassword,
      role: Role.ADMIN,
      createdAt: new Date('2026-05-01T07:30:00.000Z'),
    },
  });

  console.log('👤 Users seeded:', userRian.id, userSiti.id, userBudi.id);

  // 4. Seed Accounts
  const acc1 = await prisma.account.create({
    data: {
      userId: userRian.id,
      name: 'BCA Personal',
      type: AccountType.BANK,
      balance: 5450000.0,
      createdAt: new Date('2026-05-01T08:30:00.000Z'),
    },
  });

  const acc2 = await prisma.account.create({
    data: {
      userId: userRian.id,
      name: 'GoPay Rian',
      type: AccountType.E_WALLET,
      balance: 350000.0,
      createdAt: new Date('2026-05-01T08:45:00.000Z'),
    },
  });

  const acc3 = await prisma.account.create({
    data: {
      userId: userSiti.id,
      name: 'Mandiri Utama',
      type: AccountType.BANK,
      balance: 12150000.0,
      createdAt: new Date('2026-05-03T09:30:00.000Z'),
    },
  });

  const acc4 = await prisma.account.create({
    data: {
      userId: userSiti.id,
      name: 'Dompet Tunai',
      type: AccountType.CASH,
      balance: 450000.0,
      createdAt: new Date('2026-05-03T09:40:00.000Z'),
    },
  });

  const acc5 = await prisma.account.create({
    data: {
      userId: userBudi.id,
      name: 'BNI Bisnis',
      type: AccountType.BANK,
      balance: 27300000.0,
      createdAt: new Date('2026-05-01T07:45:00.000Z'),
    },
  });

  const acc6 = await prisma.account.create({
    data: {
      userId: userBudi.id,
      name: 'OVO Budi',
      type: AccountType.E_WALLET,
      balance: 850000.0,
      createdAt: new Date('2026-05-01T07:50:00.000Z'),
    },
  });

  console.log('💳 Accounts seeded');

  // 5. Seed Categories
  const cat1 = await prisma.category.create({
    data: { name: 'Gaji Bulanan', type: CategoryType.INCOME },
  });
  const cat2 = await prisma.category.create({
    data: { name: 'Pendapatan Freelance', type: CategoryType.INCOME },
  });
  const cat3 = await prisma.category.create({
    data: { name: 'Makanan & Minuman', type: CategoryType.EXPENSE },
  });
  const cat4 = await prisma.category.create({
    data: { name: 'Transportasi', type: CategoryType.EXPENSE },
  });
  const cat5 = await prisma.category.create({
    data: { name: 'Tagihan & Utilitas', type: CategoryType.EXPENSE },
  });
  const cat6 = await prisma.category.create({
    data: { name: 'Hiburan & Hobi', type: CategoryType.EXPENSE },
  });

  console.log('🏷️ Categories seeded');

  // 6. Seed Transactions
  const transactionsData = [
    // Transaksi Rian (Acc 1 & 2)
    {
      accountId: acc1.id,
      categoryId: cat1.id,
      type: TransactionType.INCOME,
      amount: 7500000.0,
      description: 'Gaji PT Tech Nusantara',
      createdAt: new Date('2026-06-25T09:00:00.000Z'),
    },
    {
      accountId: acc1.id,
      categoryId: cat5.id,
      type: TransactionType.EXPENSE,
      amount: 450000.0,
      description: 'Bayar Listrik & Internet',
      createdAt: new Date('2026-06-26T10:30:00.000Z'),
    },
    {
      accountId: acc2.id,
      categoryId: cat3.id,
      type: TransactionType.EXPENSE,
      amount: 45000.0,
      description: 'Beli Kopi Susu',
      createdAt: new Date('2026-06-26T15:20:00.000Z'),
    },
    {
      accountId: acc1.id,
      categoryId: cat4.id,
      type: TransactionType.EXPENSE,
      amount: 200000.0,
      description: 'Isi Bensin Mobil',
      createdAt: new Date('2026-06-28T08:00:00.000Z'),
    },
    {
      accountId: acc2.id,
      categoryId: cat3.id,
      type: TransactionType.EXPENSE,
      amount: 85000.0,
      description: 'Makan Siang Nasi Padang',
      createdAt: new Date('2026-06-29T12:15:00.000Z'),
    },
    {
      accountId: acc2.id,
      categoryId: cat6.id,
      type: TransactionType.EXPENSE,
      amount: 120000.0,
      description: 'Tiket Bioskop Weekend',
      createdAt: new Date('2026-07-04T19:00:00.000Z'),
    },
    {
      accountId: acc1.id,
      categoryId: cat3.id,
      type: TransactionType.EXPENSE,
      amount: 1150000.0,
      description: 'Belanja Bulanan Supermarket',
      createdAt: new Date('2026-07-05T11:00:00.000Z'),
    },

    // Transaksi Siti (Acc 3 & 4)
    {
      accountId: acc3.id,
      categoryId: cat1.id,
      type: TransactionType.INCOME,
      amount: 15000000.0,
      description: 'Gaji Bulanan Senior Manager',
      createdAt: new Date('2026-06-27T08:30:00.000Z'),
    },
    {
      accountId: acc3.id,
      categoryId: cat2.id,
      type: TransactionType.INCOME,
      amount: 2500000.0,
      description: 'Proyek Desain Logo UI/UX',
      createdAt: new Date('2026-06-29T16:00:00.000Z'),
    },
    {
      accountId: acc4.id,
      categoryId: cat3.id,
      type: TransactionType.EXPENSE,
      amount: 35000.0,
      description: 'Beli Sarapan Bubur Ayam',
      createdAt: new Date('2026-06-30T07:10:00.000Z'),
    },
    {
      accountId: acc3.id,
      categoryId: cat5.id,
      type: TransactionType.EXPENSE,
      amount: 1800000.0,
      description: 'Bayar Asuransi Kesehatan',
      createdAt: new Date('2026-07-01T09:00:00.000Z'),
    },
    {
      accountId: acc4.id,
      categoryId: cat4.id,
      type: TransactionType.EXPENSE,
      amount: 50000.0,
      description: 'Tarif Parkir & Tol',
      createdAt: new Date('2026-07-02T14:00:00.000Z'),
    },
    {
      accountId: acc3.id,
      categoryId: cat6.id,
      type: TransactionType.EXPENSE,
      amount: 350000.0,
      description: 'Beli Buku Novel & Self-Improvement',
      createdAt: new Date('2026-07-06T16:45:00.000Z'),
    },
    {
      accountId: acc3.id,
      categoryId: cat3.id,
      type: TransactionType.EXPENSE,
      amount: 315000.0,
      description: 'Makan Malam Keluarga',
      createdAt: new Date('2026-07-10T20:00:00.000Z'),
    },
    {
      accountId: acc4.id,
      categoryId: cat3.id,
      type: TransactionType.EXPENSE,
      amount: 20000.0,
      description: 'Beli Cemilan Minimarket',
      createdAt: new Date('2026-07-12T10:30:00.000Z'),
    },

    // Transaksi Budi (Acc 5 & 6)
    {
      accountId: acc5.id,
      categoryId: cat1.id,
      type: TransactionType.INCOME,
      amount: 35000000.0,
      description: 'Profit Sharing Bulanan Bisnis',
      createdAt: new Date('2026-06-28T10:00:00.000Z'),
    },
    {
      accountId: acc5.id,
      categoryId: cat5.id,
      type: TransactionType.EXPENSE,
      amount: 5500000.0,
      description: 'Sewa Ruang Kantor Bulanan',
      createdAt: new Date('2026-07-01T11:00:00.000Z'),
    },
    {
      accountId: acc6.id,
      categoryId: cat3.id,
      type: TransactionType.EXPENSE,
      amount: 150000.0,
      description: 'Ngopi & Meeting Client',
      createdAt: new Date('2026-07-02T15:30:00.000Z'),
    },
    {
      accountId: acc5.id,
      categoryId: cat4.id,
      type: TransactionType.EXPENSE,
      amount: 1200000.0,
      description: 'Service Rutin Kendaraan',
      createdAt: new Date('2026-07-03T09:15:00.000Z'),
    },
    {
      accountId: acc6.id,
      categoryId: cat6.id,
      type: TransactionType.EXPENSE,
      amount: 450000.0,
      description: 'Top Up Game / Hiburan Steam',
      createdAt: new Date('2026-07-05T22:00:00.000Z'),
    },
    {
      accountId: acc5.id,
      categoryId: cat3.id,
      type: TransactionType.EXPENSE,
      amount: 850000.0,
      description: 'Catering Makan Siang Kantor',
      createdAt: new Date('2026-07-08T12:00:00.000Z'),
    },
    {
      accountId: acc6.id,
      categoryId: cat3.id,
      type: TransactionType.EXPENSE,
      amount: 50000.0,
      description: 'Beli Minuman Boba',
      createdAt: new Date('2026-07-14T14:20:00.000Z'),
    },
  ];

  for (const t of transactionsData) {
    await prisma.transaction.create({ data: t });
  }

  console.log(`💸 Seeded ${transactionsData.length} transactions`);
  console.log('✅ Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
