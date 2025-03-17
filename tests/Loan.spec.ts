import request from 'supertest'
import { LoanDto } from './DTO/LoanDto'
import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test.describe('Loan Api Tests', () => {
  const BASE_URL = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

  test('should return 200 for a valid loan request', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.validLoan())
    expect(response.status).toEqual(StatusCodes.OK)
    expect(response.body).toHaveProperty('riskScore')
    expect(response.body).toHaveProperty('riskPeriods')
    expect(response.body).toHaveProperty('applicationId')
    expect(response.body).toHaveProperty('riskDecision')
  })

  test('should return 200 with Low Risk', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.lowRiskLoan())
    expect(response.status).toEqual(StatusCodes.OK)
    expect(response.body.riskLevel).toEqual('Very High Risk')
    expect(response.body).toHaveProperty('riskScore')
    expect(response.body).toHaveProperty('riskPeriods')
    expect(response.body).toHaveProperty('applicationId')
    expect(response.body).toHaveProperty('riskDecision')
  })
  test('should return 200 with Medium Risk', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.mediumRiskLoan())
    expect(response.status).toEqual(StatusCodes.OK)
    expect(response.body.riskLevel).toEqual('Medium Risk')
    expect(response.body).toHaveProperty('riskScore')
    expect(response.body).toHaveProperty('riskPeriods')
    expect(response.body).toHaveProperty('applicationId')
    expect(response.body).toHaveProperty('riskDecision')
  })
  test('should return 200 with High Risk', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.highRiskLoan())
    expect(response.status).toEqual(StatusCodes.OK)
    expect(response.body.riskLevel).toEqual('High Risk')
    expect(response.body).toHaveProperty('riskScore')
    expect(response.body).toHaveProperty('riskPeriods')
    expect(response.body).toHaveProperty('applicationId')
    expect(response.body).toHaveProperty('riskDecision')
  })

  test('should return 400 for invalid income ', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.invalidIncome())
    expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
  })

  test('should return 400 for negative debt ', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.negativeDebt())
    expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
  })

  test('should should return 400 for underage applicant ', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.underageApplicant())
    expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
  })

  test('should return 400 for negative loan amount ', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.negativeLoanAmount())
    expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
  })

  test('should return 400 for invalid loan period', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.invalidLoanPeriod())
    expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
  })

  test('should return 200 when income is less than loan amount', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.incomeLessThanLoanAmount())
    expect(response.status).toEqual(StatusCodes.OK)
    expect(response.body).toHaveProperty('riskScore')
    expect(response.body).toHaveProperty('riskPeriods')
    expect(response.body).toHaveProperty('applicationId')
    expect(response.body).toHaveProperty('riskDecision')
  })

  test('should return 200 when income equals loan amount and long loan period', async () => {
    const response = await request(BASE_URL)
      .post('/')
      .send(LoanDto.incomeEqualsLoanAmountLongPeriod())
    expect(response.status).toEqual(StatusCodes.OK)
    expect(response.body).toHaveProperty('riskScore')
    expect(response.body).toHaveProperty('riskPeriods')
  })

  test('should return 400 for empty income field', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.emptyIncome())
    expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
  })

  test('should return 400 for empty debt field', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.emptyDebt())
    expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
  })

  test('should return 400 for empty age field', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.emptyAge())
    expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
  })

  test('should return 400 for empty employed field', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.emptyEmployed())
    expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
  })

  test('should return 400 for empty loanAmount field', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.emptyLoanAmount())
    expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
  })

  test('should return 400 for empty loanPeriod field', async () => {
    const response = await request(BASE_URL).post('/').send(LoanDto.emptyLoanPeriod())
    expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
  })
})
