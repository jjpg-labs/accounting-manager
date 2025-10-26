import { cookies } from 'next/headers';
import { createApiClient } from '../../api';
import axios, { HttpStatusCode } from 'axios';

export async function GET() {
  const cookieStore = await cookies();
  const apiClient = createApiClient(cookieStore);

  try {
    const response = await apiClient.get('/auth/me');
    return new Response(JSON.stringify(response.data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status !== HttpStatusCode.Unauthorized) {
        const status = error.response?.status || 500;
        const message =
          error.response?.data?.message || 'Internal Server Error';

        return new Response(JSON.stringify({ error: message }), {
          status,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response();
  }
}
