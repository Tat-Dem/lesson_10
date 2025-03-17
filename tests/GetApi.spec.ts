import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('Successful retrieval of order list with valid authentication receive code OK', async ({
  request,
}) => {
  const requestParameters = {
    username: 'Tatjana',
    password: '12345678',
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: requestParameters,
  })
  expect(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  const apiKey: string = responseBody.apiKey
  console.log(apiKey)
  expect(typeof responseBody.apiKey).toBe('string')
})

test('Unsuccessful retrieval of order list with invalid credentials', async ({ request }) => {
  const requestParameters = {
    username: 'InvalidUser',
    password: 'wrongpassword',
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: requestParameters,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unsuccessful retrieval of order list with missing credentials', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders')
  // falls and gives out receive code INTERNAL_SERVER_ERROR = 500
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Rate limiting: Too many requests within a short time frame', async ({ request }) => {
  const requestParameters = {
    username: 'Tatjana',
    password: '12345678',
  }
  for (let i = 0; i < 100; i++) {
    await request.get('https://backend.tallinn-learning.ee/test-orders', {
      params: requestParameters,
    })
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: requestParameters,
  })
  expect(response.status()).toBe(StatusCodes.TOO_MANY_REQUESTS)
})
