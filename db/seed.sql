-- CLEANUP / TRUNCATE DATA SEBELUM SEEDING
-- TRUNCATE dengan RESTART IDENTITY memutar kembali Auto-Increment ID ke 1
TRUNCATE TABLE transactions, categories, accounts, users RESTART IDENTITY CASCADE;

-- SEED DATA FOR USERS
INSERT INTO users (name, email, password, role, created_at)
VALUES ('Rian Wijaya', 'rian.wijaya@email.com', 'rian123', 'USER', '2026-05-01 08:00:00'),
       ('Siti Aminah', 'siti.aminah@email.com', 'siti456', 'USER', '2026-05-03 09:15:00'),
       ('Budi Santoso', 'budi.admin@email.com', 'budi789', 'ADMIN', '2026-05-01 07:30:00');

-- SEED DATA FOR ACCOUNTS
INSERT INTO accounts (user_id, name, type, balance, created_at)
VALUES (1, 'BCA Personal', 'BANK', 5450000.00, '2026-05-01 08:30:00'),
       (1, 'GoPay Rian', 'E_WALLET', 350000.00, '2026-05-01 08:45:00'),
       (2, 'Mandiri Utama', 'BANK', 12150000.00, '2026-05-03 09:30:00'),
       (2, 'Dompet Tunai', 'CASH', 450000.00, '2026-05-03 09:40:00'),
       (3, 'BNI Bisnis', 'BANK', 27300000.00, '2026-05-01 07:45:00'),
       (3, 'OVO Budi', 'E_WALLET', 850000.00, '2026-05-01 07:50:00');

-- SEED DATA FOR CATEGORIES
INSERT INTO categories (name, type)
VALUES ('Gaji Bulanan', 'INCOME'),
       ('Pendapatan Freelance', 'INCOME'),
       ('Makanan & Minuman', 'EXPENSE'),
       ('Transportasi', 'EXPENSE'),
       ('Tagihan & Utilitas', 'EXPENSE'),
       ('Hiburan & Hobi', 'EXPENSE');

-- SEED DATA FOR TRANSACTIONS
INSERT INTO transactions (account_id, category_id, type, amount, description, created_at)
VALUES
-- Transaksi Rian (Akun ID 1 & 2)
(1, 1, 'INCOME', 7500000.00, 'Gaji PT Tech Nusantara', '2026-06-25 09:00:00'),
(1, 5, 'EXPENSE', 450000.00, 'Bayar Listrik & Internet', '2026-06-26 10:30:00'),
(2, 3, 'EXPENSE', 45000.00, 'Beli Kopi Susu', '2026-06-26 15:20:00'),
(1, 4, 'EXPENSE', 200000.00, 'Isi Bensin Mobil', '2026-06-28 08:00:00'),
(2, 3, 'EXPENSE', 85000.00, 'Makan Siang Nasi Padang', '2026-06-29 12:15:00'),
(2, 6, 'EXPENSE', 120000.00, 'Tiket Bioskop Weekend', '2026-07-04 19:00:00'),
(1, 3, 'EXPENSE', 1150000.00, 'Belanja Bulanan Supermarket', '2026-07-05 11:00:00'),

-- Transaksi Siti (Akun ID 3 & 4)
(3, 1, 'INCOME', 15000000.00, 'Gaji Bulanan Senior Manager', '2026-06-27 08:30:00'),
(3, 2, 'INCOME', 2500000.00, 'Proyek Desain Logo UI/UX', '2026-06-29 16:00:00'),
(4, 3, 'EXPENSE', 35000.00, 'Beli Sarapan Bubur Ayam', '2026-06-30 07:10:00'),
(3, 5, 'EXPENSE', 1800000.00, 'Bayar Asuransi Kesehatan', '2026-07-01 09:00:00'),
(4, 4, 'EXPENSE', 50000.00, 'Tarif Parkir & Tol', '2026-07-02 14:00:00'),
(3, 6, 'EXPENSE', 350000.00, 'Beli Buku Novel & Self-Improvement', '2026-07-06 16:45:00'),
(3, 3, 'EXPENSE', 315000.00, 'Makan Malam Keluarga', '2026-07-10 20:00:00'),
(4, 3, 'EXPENSE', 20000.00, 'Beli Cemilan Minimarket', '2026-07-12 10:30:00'),

-- Transaksi Budi (Akun ID 5 & 6)
(5, 1, 'INCOME', 35000000.00, 'Profit Sharing Bulanan Bisnis', '2026-06-28 10:00:00'),
(5, 5, 'EXPENSE', 5500000.00, 'Sewa Ruang Kantor Bulanan', '2026-07-01 11:00:00'),
(6, 3, 'EXPENSE', 150000.00, 'Ngopi & Meeting Client', '2026-07-02 15:30:00'),
(5, 4, 'EXPENSE', 1200000.00, 'Service Rutin Kendaraan', '2026-07-03 09:15:00'),
(6, 6, 'EXPENSE', 450000.00, 'Top Up Game / Hiburan Steam', '2026-07-05 22:00:00'),
(5, 3, 'EXPENSE', 850000.00, 'Catering Makan Siang Kantor', '2026-07-08 12:00:00'),
(6, 3, 'EXPENSE', 50000.00, 'Beli Minuman Boba', '2026-07-14 14:20:00');