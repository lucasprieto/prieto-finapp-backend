import { model, Schema, Document } from 'mongoose'
import { Expense, PaymentMethod } from '@/interfaces/expense.interface'

const expenseSchema: Schema = new Schema({
  date: { type: Date, required: true },
  description: { type: String },
  category: { type: String },
  paymentMethod: { type: String, default: PaymentMethod.Cash, enum: Object.values(PaymentMethod) },
  instalments: { type: Number },
  value: { type: Number, default: 0 },
  archived: { type: Boolean, default: false },
})

const expenseModel = model<Expense & Document>('Expense', expenseSchema, 'expenses')

export default expenseModel
