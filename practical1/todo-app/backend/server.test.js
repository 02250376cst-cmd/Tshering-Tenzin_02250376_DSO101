const request = require('supertest');

// Mock pg Pool
jest.mock('pg', () => {
  const mPool = {
    query: jest.fn().mockResolvedValue({ rows: [] }),
  };
  return { Pool: jest.fn(() => mPool) };
});

const app = require('./server');

describe('Todo API', () => {
  test('GET /tasks returns 200', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
  });

  test('POST /tasks returns 200', async () => {
    const { Pool } = require('pg');
    const mockPool = new Pool();
    mockPool.query.mockResolvedValueOnce({ rows: [] }); // for CREATE TABLE
    mockPool.query.mockResolvedValueOnce({
      rows: [{ id: 1, title: 'Test task', completed: false }]
    });

    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Test task' });
    expect(res.statusCode).toBe(200);
  });

  test('DELETE /tasks/:id returns 204', async () => {
    const res = await request(app).delete('/tasks/1');
    expect(res.statusCode).toBe(204);
  });
});