import { BANNERS_LIST, BANNERS_GET, IMAGE_PATH } from './API';

export async function fetchBannersByArea(
  area: number,
  status: string = 'active',
  limit: number = 5
) {
  const params = new URLSearchParams({ area: String(area), status, limit: String(limit) });
  const response = await fetch(`${BANNERS_LIST}?${params.toString()}`);
  const data = await response.json();
  if (data.status === 'success') {
    return data.data.banners || [];
  }
  return [];
}

export async function fetchBannerById(id: number) {
  const response = await fetch(`${BANNERS_GET}?id=${id}`);
  const data = await response.json();
  if (data.status === 'success') {
    return data.data;
  }
  return null;
}

export function getBannerImageUrl(image: string) {
  return IMAGE_PATH + 'banners/' + image;
}
