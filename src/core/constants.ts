// export const API_BASE_URL = import.meta.env.VITE_REST_API_URL || 'http://127.0.0.1:8000/api';
export const API_BASE_URL_LOCAL = 'http://127.0.0.1:8000/api';
export const API_BASE_URL_ONLINE = 'https://logipath-backend.onrender.com/api';
export const API_BASE_URL = API_BASE_URL_LOCAL;
export const MAKE_WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL || 'http://localhost:5000/make-webhook';

export const WHATSAPP_WEBHOOK_URL = `${MAKE_WEBHOOK_URL}/whatsapp`;
export const AUTHORIZATION = `authToken`;
export const CONVERSATION_HISTORY_ENDPOINT = `${API_BASE_URL}/conversations/history`;
export const PACKAGE_STATUS_ENDPOINT = `${API_BASE_URL}/packages/status`;