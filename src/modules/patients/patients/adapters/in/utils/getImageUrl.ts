export enum ImagePath {
  LANDING = 'landing',
  USERS = 'users',
  ECOMMERCE = 'e-commerce',
  PROFILE = 'profile'
}

// ==============================|| NEW URL - GET IMAGE URL ||============================== //


//todo: query to server to get image
export function getImageUrl(name: string, path: string) {
  return new URL(`/src/assets/images/${path}/${name}`, import.meta.url).href;
}
