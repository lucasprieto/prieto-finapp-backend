export enum PaymentMethod {
  Cash = 'cash',
  Debit = 'debit',
  CreditCard = 'credit',
}

export interface Expense {
  _id: string
  date: string
  description: string
  paymentMethod: PaymentMethod
  instalments: number
  value: number
  archived: boolean
}
