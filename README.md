# Fintrack API - Milestone 4 & 5

Dokumentasi backend untuk Fintrack yang mencakup fitur pengelolaan Categories, Transactions, Accounts, Users, beserta sistem Autentikasi dan Keamanan tingkat lanjut.

### Deployed Backend

[![Deploy on Railway](https://railway.com/button.svg)](https://milestone-4-diba15-production.up.railway.app/)

### API Documentation & Smoke Test

[![Swagger](https://img.shields.io/badge/Swagger-2.0-blue)](https://milestone-4-diba15-production.up.railway.app/docs)
[![Postman Collection](https://img.shields.io/badge/Postman-v2.1-orange)](./docs/fintrack.postman_collection.json)
[![Smoke Test](https://img.shields.io/badge/Smoke%20Test-Passed-brightgreen)](./docs/api-smoke-test.md)

---

## 🚀 How to Run (Local Setup)

**1. Install Dependencies**

```bash
pnpm install
```

**2. Setup Environment Variables**

Buat file `.env` di root directory dan isi berdasarkan `.env.example`.

**3. Database Migration & Seed**

```bash
pnpm dlx prisma migrate dev
pnpm dlx prisma db seed
```

**4. Run Server**

```bash
pnpm run start:dev
```

---

## 🏗️ Arsitektur & Dependency Injection

Aplikasi ini dibangun menggunakan arsitektur modular NestJS dengan menerapkan prinsip **Repository Pattern** untuk memisahkan logika akses database (Prisma) dari logika bisnis (Service).

**Custom Provider Implementation:**

Logika kalkulasi saldo saat pembuatan/perubahan/penghapusan transaksi dipisahkan secara murni ke dalam `BalanceCalculatorService`. Service ini di-inject ke dalam `TransactionsService` menggunakan pendekatan **Custom Provider** dengan string token (`@Inject('BALANCE_CALCULATOR')`).

> **Alasan arsitektural:** Memisahkan logika matematika murni dari ketergantungan framework/database sehingga lebih mudah di-unit test secara mandiri.

---

## 🛡️ Security & Hardening Features

Aplikasi ini dilengkapi perlindungan keamanan setara produksi:

- **Request Logging (Custom Middleware):** Mencatat setiap metode HTTP, path, status code, dan response time ke terminal untuk kebutuhan audit.
- **Authentication & Stateful JWT:** Menggunakan Passport-JWT. Hash refresh token disimpan di DB untuk mendukung proses verifikasi dan fitur logout/revoke token.
- **Per-User Data Ownership:** Setiap operasi Read/Update/Delete pada Accounts dan Transactions memvalidasi `userId` dari JWT. User A sama sekali tidak bisa mengakses/melihat data finansial User B.
- **Role-Based Access Control (RBAC):** Menerapkan kustom `@Roles()` decorator dan `RolesGuard`. Fitur administratif (seperti melihat seluruh data user) dikunci secara ketat untuk `ADMIN`.
- **Security Hardening:**
  - **Helmet.js:** Mengamankan aplikasi dari kerentanan web standar via HTTP headers.
  - **CORS:** Dibatasi secara eksplisit melalui `.env`.
  - **Rate Limiting (Throttler):** Mencegah serangan Brute Force, terutama pada endpoint `/auth/login` (maksimal 3 request/menit per IP).
  - **Data Sanitization:** Password hash dan data sensitif dibuang dari setiap response payload menggunakan Prisma `select`.

---

## 🗄️ Database Schema & ERD

![Entity Relationship Diagram](./docs/erd.png)

### Categories (Master Data)

| Field | Type         | Notes                 |
|-------|--------------|-----------------------|
| id    | number       | unique                |
| name  | string       |                       |
| type  | categoryType | enum: INCOME, EXPENSE |

### Transactions

| Field       | Type            | Notes                           |
|-------------|-----------------|---------------------------------|
| id          | number          | unique                          |
| accountId   | number          | FK ke Account.id                |
| categoryId  | number          | FK ke Category.id               |
| type        | transactionType | enum: INCOME, EXPENSE, TRANSFER |
| amount      | number          | jumlah desimal                  |
| description | string          |                                 |
| createdAt   | Date            | timestamp                       |

### Accounts

| Field     | Type        | Notes                      |
|-----------|-------------|----------------------------|
| id        | number      | unique                     |
| userId    | number      | FK ke User.id              |
| name      | string      | nama akun                  |
| type      | accountType | enum: CASH, BANK, E_WALLET |
| balance   | number      | jumlah saat ini            |
| createdAt | Date        | timestamp                  |

### Users

| Field     | Type   | Notes             |
|-----------|--------|-------------------|
| id        | number | unique            |
| name      | string |                   |
| email     | string |                   |
| password  | string | Hashed via Bcrypt |
| role      | role   | enum: ADMIN, USER |
| createdAt | Date   | timestamp         |

---

## 📡 Endpoints

**Keterangan Ikon:**

- 🔓 : Bebas Akses (Public)
- 🔒 : Wajib Login (Bearer Token)
- 👑 : Khusus Admin (RBAC)

Global Prefix (`/api`)

### 🔑 Authentication (`/auth`)

- 🔓 `POST /auth/login` — Rate-limited (3 req/min)
- 🔓 `POST /auth/register`
- 🔒 `POST /auth/logout`
- 🔒 `POST /auth/refresh-token` — Requires Refresh Token in Auth Header
- 🔒 `GET /auth/me` — Memuat profil pengguna yang sedang login

### 👥 Users (`/users`)

- 👑 `GET /users` — (Admin Only: List seluruh pengguna)
- 🔒 `GET /users/:id` — (Strict Ownership: Hanya owner atau Admin)
- 🔒 `PATCH /users/:id` — body: `UpdateUserDto` (Strict Ownership)
- 🔒 `DELETE /users/:id` — (Strict Ownership)

### 💳 Accounts (`/accounts`)

- 🔒 `POST /accounts` — body: `CreateAccountDto`
- 🔒 `GET /accounts` — (Per-user ownership: Hanya memuat akun milik user login)
- 🔒 `GET /accounts/:id` — (Strict Ownership)
- 🔒 `PATCH /accounts/:id` — body: `UpdateAccountDto` (Strict Ownership)
- 🔒 `DELETE /accounts/:id` — (Strict Ownership)

### 💸 Transactions (`/transactions`)

- 🔒 `POST /transactions` — body: `CreateTransactionDto`
- 🔒 `GET /transactions` — (Per-user ownership: Hanya memuat transaksi milik user login)
- 🔒 `GET /transactions/:id` — (Strict Ownership)
- 🔒 `PATCH /transactions/:id` — body: `UpdateTransactionDto` (Strict Ownership)
- 🔒 `DELETE /transactions/:id` — (Strict Ownership, reverse balance)

### 🏷️ Categories (`/categories`)

- 🔒 `POST /categories` — body: `CreateCategoryDto`
- 🔒 `GET /categories` — Memuat seluruh kategori
- 🔒 `GET /categories/:id` — Detail kategori
- 🔒 `PATCH /categories/:id` — body: `UpdateCategoryDto`
- 🔒 `DELETE /categories/:id` — Hapus kategori

---

## 📄 Documentation Artifacts

- 📌 **Postman Collection**: [`docs/fintrack.postman_collection.json`](./docs/fintrack.postman_collection.json)
- 📌 **Smoke Test Results**: [`docs/api-smoke-test.md`](./docs/api-smoke-test.md)