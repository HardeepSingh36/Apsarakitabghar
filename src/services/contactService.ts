import { CONTACT_FORMS } from './API';

// Contact form request interface
export interface ContactFormRequest {
  fullname: string;
  email: string;
  subject?: string;
  message: string;
  captcha_token: string;
}

// Contact form response interfaces
export interface ContactFormResponse {
  status: string;
  message: string;
  data: {
    id: number;
    subject: string;
    message: string;
    status: string;
    created_at: string;
  };
}

// Helper function to get auth headers
const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Submit contact form
export const submitContactForm = async (
  formData: ContactFormRequest
): Promise<ContactFormResponse> => {
  // Log the request data for debugging
  console.log('Submitting contact form with data:', formData);

  const response = await fetch(CONTACT_FORMS, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP ${response.status}: Failed to submit contact form`,
    }));
    console.error('Contact form submission error:', {
      status: response.status,
      statusText: response.statusText,
      error,
    });
    throw new Error(error.message || `Failed to submit contact form (${response.status})`);
  }

  return response.json();
};
