import axios from 'axios';
import { Types } from 'mongoose';

const testDto = {
  name: 'test',
  title: 'title',
  description: 'description',
  rating: 3,
  productId: new Types.ObjectId().toHexString(),
};

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Hello API' });
  });

  it('/api/review/create (POST)', async () => {
    const res = await axios.post(`/api/review/create`, {
      ...testDto,
    });
    expect(res.status).toBe(201);
    expect(res.data.productId).toBe(testDto.productId);
  });
});
