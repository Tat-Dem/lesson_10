import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('Successful order update with valid API key and id and return status code OK', async ({
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
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Unsuccessful update of order with valid API key and invalid id and return status code Not Found', async ({
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
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/11', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unsuccessful update of order with missing API key and return status code Unauthorized', async ({
  request,
}) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'Harry',
    customerPhone: '37253244422',
    comment: 'hello eGTeM',
    id: 6,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unsuccessful update of order with invalid API key', async ({ request }) => {
  const requestHeaders = {
    api_key: 'invalid-api-key',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'Harry',
    customerPhone: '37253244422',
    comment: 'hello eGTeM',
    id: 6,
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Unsuccessful update of order with missing order ID', async ({ request }) => {
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
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unsuccessful update of order with invalid order data', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    invalidField: 'invalidData',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: requestBody,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unsuccessful update of order with empty request body', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
    data: {},
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
