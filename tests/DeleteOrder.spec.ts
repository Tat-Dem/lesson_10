import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('Successfully deleting an existing order with a correct id and valid API key', async ({
  request,
}) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'Harry',
    customerPhone: '37253244422',
    comment: 'hello eGTeM',
    id: 6,
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('Unsuccessfully deleting a non-existent order with a valid API key', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/199', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unsuccessfully deleting an order with a valid API key and invalid id', async ({
  request,
}) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const response = await request.delete(
    'https://backend.tallinn-learning.ee/test-orders/invalid-id',
    {
      headers: requestHeaders,
    },
  )
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unsuccessful deletion of order with invalid API key', async ({ request }) => {
  const requestHeaders = {
    api_key: 'invalid-api-key',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Unsuccessful order deletion with missing API key', async ({ request }) => {
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1')
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
