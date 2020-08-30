import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.all().balance;

    if (type === 'outcome' && total - value < 0) {
      throw Error('Limite indisponível');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type: type === 'income' ? 'income' : 'outcome',
    });

    return transaction;
  }
}

export default CreateTransactionService;
