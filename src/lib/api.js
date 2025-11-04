export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/';

export function api(path) {
  return new URL(path, API_BASE).toString();
}