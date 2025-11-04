export const API_BASE = import.meta.env.VITE_API_BASE || 'https://backendusuario-rldc.onrender.com/';

export function api(path) {
  return new URL(path, API_BASE).toString();
}
