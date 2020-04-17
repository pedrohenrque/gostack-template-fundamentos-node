import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .map(type => (type.type === 'income' ? type.value : 0))
      .reduce((totalIncome, incomeValue) => totalIncome + incomeValue, 0);

    const outcome = this.transactions
      .map(type => (type.type === 'outcome' ? type.value : 0))
      .reduce((total, outcomeValue) => total + outcomeValue, 0);

    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, type, value }: Transaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

// eslint-disable-next-line prettier/prettier
export default TransactionsRepository;
