import { IsString, IsDateString, IsNumber, IsEnum, IsOptional, IsNumberString, IsBooleanString } from 'class-validator'
import { PaymentMethod } from '@/interfaces/expense.interface'

export class CreateExpenseDto {
  @IsDateString()
  public date: Date

  @IsString()
  public description: string

  @IsString()
  public category: string

  @IsEnum(PaymentMethod)
  public paymentMethod: string

  @IsNumber()
  @IsOptional()
  public instalments?: number

  @IsNumber()
  public value: number
}

export class QueryExpenseDto {
  @IsOptional()
  @IsNumberString()
  public year?: number

  @IsOptional()
  @IsNumberString()
  public month?: number

  @IsOptional()
  @IsString()
  public description?: string

  @IsOptional()
  @IsEnum(PaymentMethod)
  public paymentMethod?: string

  @IsOptional()
  @IsBooleanString()
  public archived?: boolean
}
