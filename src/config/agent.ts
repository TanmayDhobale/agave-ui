// Agave agent configuration
const envWsUrl = import.meta.env.VITE_AGAVE_AGENT_WS as string;
const queryWsUrl = new URLSearchParams(window.location.search).get("ws");
const defaultWsUrl = "ws://127.0.0.1:9402/ws";

export const AGENT_CONFIG = {
  wsUrl: envWsUrl || queryWsUrl || defaultWsUrl,
  healthUrl:
    (import.meta.env.VITE_AGAVE_AGENT_HEALTH as string) ||
    "http://127.0.0.1:9402/healthz",
  reconnectDelay: 500,
  maxReconnectDelay: 30000,
} as const;

export type AgentConfig = typeof AGENT_CONFIG;
