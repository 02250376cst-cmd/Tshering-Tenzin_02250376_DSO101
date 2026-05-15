const request = require('supertest');

// Mock pg Pool before requiring app
jest.mock('pg', () => {
  const mPool = {
    query: jest.fn().mockResolvedValue({ rows: [] }),
  };
  return { Pool: jest.fn(() => mPool) };
});

const app = require('./server');

describe('Todo API', () => {
  test('GET /todos returns 200', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
  });

  test('POST /todos returns 200', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ task: 'Test task' });
    expect(res.statusCode).toBe(200);
  });
});