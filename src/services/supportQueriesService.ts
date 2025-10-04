import { SUPPORT_TICKETS } from './API';

export interface SupportTicket {
  id: number;
  ticket_no: string;
  category: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  admin_response?: string;
  responded_at?: string;
  admin_name?: string;
  closed_at?: string;
  customer_rating?: number;
  customer_feedback?: string;
  created_at: string;
  updated_at?: string;
  is_open: boolean;
  is_resolved: boolean;
  is_closed: boolean;
  has_response: boolean;
}

export interface SubmitTicketRequest {
  category: string;
  subject: string;
  description: string;
  priority?: string;
  captcha_token: string;
}

export interface SubmitTicketResponse {
  status: string;
  message: string;
  data: {
    id: number;
    ticket_no: string;
    category: string;
    subject: string;
    description: string;
    priority: string;
    status: string;
    created_at: string;
  };
}

export interface TicketsListResponse {
  status: string;
  message: string;
  data: {
    tickets: SupportTicket[];
    pagination: {
      current_page: number;
      per_page: number;
      total_items: number;
      total_pages: number;
      has_next: boolean;
      has_prev: boolean;
    };
    filters: {
      category?: string;
      status?: string;
      priority?: string;
    };
  };
}

export const submitSupportTicket = async (
  ticketData: SubmitTicketRequest
): Promise<SubmitTicketResponse> => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const res = await fetch(SUPPORT_TICKETS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(ticketData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to submit support ticket');
  }

  return res.json();
};

export const getSupportTickets = async (params?: {
  status?: string;
  category?: string;
  priority?: string;
  page?: number;
  limit?: number;
}): Promise<TicketsListResponse> => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  // Build query string
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append('status', params.status);
  if (params?.category) queryParams.append('category', params.category);
  if (params?.priority) queryParams.append('priority', params.priority);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  const url = queryParams.toString() ? `${SUPPORT_TICKETS}?${queryParams}` : SUPPORT_TICKETS;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to fetch support tickets');
  }

  return res.json();
};
