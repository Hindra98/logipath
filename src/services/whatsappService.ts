import axios, { type AxiosInstance } from "axios";
import { MAKE_WEBHOOK_URL } from "../core/constants";

if (!MAKE_WEBHOOK_URL) {
  console.warn("VITE_MAKE_WEBHOOK_URL is not defined, Make.com calls may fail");
}
const makeClient: AxiosInstance = axios.create({
  baseURL: MAKE_WEBHOOK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
export interface ConversationRecord {
  id: string;
  sender: string;
  message: string;
  timestamp: string; // ISO
}

/**
 * Retourne l'historique de conversation courant stocké chez Make.com
 */
export async function getConversationHistory(): Promise<ConversationRecord[]> {
  const response = await makeClient.get("/whatsapp/history");
  return response.data as ConversationRecord[];
}

/**
 * Envoie un message manuellement via le webhook Make.com, utile si l'IA a demandé de l'aide.
 * @param recipientNumber numéro en format international
 * @param message texte à envoyer
 */
export async function sendManualMessage(
  recipientNumber: string,
  message: string,
): Promise<void> {
  await makeClient.post("/whatsapp/send", {
    to: recipientNumber,
    body: message,
  });
}

export default {
  getConversationHistory,
  sendManualMessage,
};
