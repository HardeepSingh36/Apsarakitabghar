import { SUPPORT_QUERIES } from './API';

export interface SupportQuery {
  id: number;
  category: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export interface SubmitQueryRequest {
  category: string;
  subject: string;
  description: string;
  priority?: string;
  captcha_token: string;
}

export interface SubmitQueryResponse {
  status: string;
  message: string;
  data: SupportQuery;
}

export interface QueriesListResponse {
  status: string;
  message: string;
  data: {
    queries: SupportQuery[];
    pagination: {
      current_page: number;
      total_pages: number;
      per_page: number;
      total_records: number;
    };
  };
}

export const submitSupportQuery = async (
  queryData: SubmitQueryRequest
): Promise<SubmitQueryResponse> => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const res = await fetch(SUPPORT_QUERIES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(queryData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to submit query');
  }

  return res.json();
};

export const getSupportQueries = async (params?: {
  status?: string;
  page?: number;
  limit?: number;
}): Promise<QueriesListResponse> => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  // Build query string
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append('status', params.status);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const url = queryParams.toString() ? `${SUPPORT_QUERIES}?${queryParams}` : SUPPORT_QUERIES;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch queries');
  }

  return res.json();
};
