import { SLIDERS_LIST } from './API';

export interface Slider {
  id: number;
  image_name: string;
  image_url: string;
  display_order: number;
  status: string;
  created_at: string;
}

export interface SlidersResponse {
  success: boolean;
  count: number;
  data: Slider[];
  message?: string;
}

/**
 * Fetch all active sliders from the API
 * @returns Promise with sliders data
 */
export const getActiveSliders = async (): Promise<SlidersResponse> => {
  try {
    const response = await fetch(SLIDERS_LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SlidersResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching sliders:', error);
    throw error;
  }
};
