// src/app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import ApiClient from '../../api';
import { cookies } from 'next/headers';
import { setAccessTokens } from '@/app/lib/helpers/auth';
import { UserData } from '@/features/user/userSlice';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserData;
}

export async function POST(request: Request) {
  const cookiesStore = await cookies();
  const apiClient = new ApiClient(cookiesStore);

  try {
    const { email, password } = await request.json();

    const response = await apiClient.post<LoginResponse>('/auth/login', {
      email,
      password,
    });

    const accessToken = response.data?.accessToken;
    const refreshToken = response.data?.refreshToken;
    await setAccessTokens(accessToken, refreshToken);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    console.error('API Route Error:', error.message);

    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Internal Server Error';

    return NextResponse.json({ error: message }, { status });
  }
}
