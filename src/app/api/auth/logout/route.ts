import { cookies } from 'next/headers';
import { createApiClient } from '../../api';
import { HttpStatusCode } from 'axios';

interface LogoutResponse {
  message: string;
}

export async function POST() {
  const cookieStore = await cookies();
  const apiClient = createApiClient(cookieStore);

  try {
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return new Response(
        JSON.stringify({ message: 'No refresh token found' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const response = await apiClient.post<LogoutResponse>('/auth/logout', {
      refreshToken,
    });

    if (response.status !== HttpStatusCode.Ok) {
      return new Response(JSON.stringify({ message: 'Logout failed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return new Response(JSON.stringify(response.data.message), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error logging out:', error);
    return new Response(JSON.stringify({ message: 'Error logging out' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
