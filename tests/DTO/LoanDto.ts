export class LoanDto {
  income: number
  debt: number
  age: number
  loanAmount: number
  employed?: boolean
  loanPeriod?: number

  constructor(
    income: number,
    debt: number,
    age: number,
    loanAmount: number,
    employed?: boolean,
    loanPeriod?: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.loanAmount = loanAmount
    this.employed = employed
    this.loanPeriod = loanPeriod
  }

  static validLoan(): LoanDto {
    return new LoanDto(20000, 0, 30, 500, true, 12)
  }

  static invalidIncome(): LoanDto {
    return new LoanDto(0, 0, 30, 500, true, 12)
  }

  static negativeDebt(): LoanDto {
    return new LoanDto(1000, -100, 30, 500, true, 12)
  }

  static underageApplicant(): LoanDto {
    return new LoanDto(1000, 0, 15, 500, true, 12)
  }

  static negativeLoanAmount(): LoanDto {
    return new LoanDto(1000, 0, 30, -500, true, 12)
  }

  static invalidLoanPeriod(): LoanDto {
    return new LoanDto(1000, 0, 30, 500, true, 0)
  }

  static incomeLessThanLoanAmount(): LoanDto {
    return new LoanDto(500, 0, 30, 1000, true, 12)
  }

  static emptyIncome(): Partial<LoanDto> {
    return { debt: 0, age: 30, loanAmount: 500, employed: true, loanPeriod: 12 }
  }

  static emptyDebt(): Partial<LoanDto> {
    return { income: 1000, age: 30, loanAmount: 500, employed: true, loanPeriod: 12 }
  }

  static emptyAge(): Partial<LoanDto> {
    return { income: 1000, debt: 0, loanAmount: 500, employed: true, loanPeriod: 12 }
  }

  static emptyEmployed(): Partial<LoanDto> {
    return { income: 1000, debt: 0, age: 30, loanAmount: 500, loanPeriod: 12 }
  }

  static emptyLoanAmount(): Partial<LoanDto> {
    return { income: 1000, debt: 0, age: 30, employed: true, loanPeriod: 12 }
  }

  static emptyLoanPeriod(): Partial<LoanDto> {
    return { income: 1000, debt: 0, age: 30, loanAmount: 500, employed: true }
  }

  static lowRiskLoan(): LoanDto {
    return new LoanDto(20000, 0, 30, 500, true, 36)
  }

  static mediumRiskLoan(): LoanDto {
    return new LoanDto(20000, 0, 30, 500, true, 9)
  }

  static highRiskLoan(): LoanDto {
    return new LoanDto(1000, 0, 25, 1000, true, 6)
  }
  static incomeEqualsLoanAmountLongPeriod(): LoanDto {
    return new LoanDto(1000, 0, 30, 1000, true, 60)
  }
}
