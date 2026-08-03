export class BalanceCalculatorService {
  calculateBalanceChange(
    oldAmount: number,
    newAmount: number,
    type: 'INCOME' | 'EXPENSE' | 'TRANSFER',
  ): number {
    const amountDiff = newAmount - oldAmount;
    return type === 'INCOME' ? amountDiff : -amountDiff;
  }

  // Tambahkan fungsi baru ini untuk operasi REMOVE
  calculateReverseBalanceChange(
    amount: number,
    type: 'INCOME' | 'EXPENSE' | 'TRANSFER',
  ): number {
    // Jika INCOME dihapus, saldo berkurang (-amount)
    // Jika EXPENSE dihapus, saldo bertambah (amount)
    return type === 'INCOME' ? -amount : amount;
  }

  isInsufficient(balance: number, amount: number, type: string): boolean {
    return (type === 'EXPENSE' || type === 'TRANSFER') && balance < amount;
  }
}
