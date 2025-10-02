import { logDebug, logWarning } from "../logger";
export interface AgaveAgentState {
  version: string | null;
  bank_slot: number | null;
  forks: number | null;
  connected: boolean;
}

export interface AgaveAgentMessage {
  version: string;
  bank_slot: number;
  forks: number;
}

export class AgaveAgentClient {
  public readonly wsUrl: string;
  private socket: WebSocket | null = null;
  private reconnectDelay = 500;
  private maxReconnectDelay = 30000;
  private listeners: Array<(state: AgaveAgentState) => void> = [];
  private isDisposing = false;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private isConnecting = false;

  public state: AgaveAgentState = {
    version: null,
    bank_slot: null,
    forks: null,
    connected: false,
  };

  constructor(wsUrl = "ws://127.0.0.1:9400/ws") {
    this.wsUrl = wsUrl;
  }

  connect() {
    if (this.isDisposing || this.isConnecting) return;

    // Close existing connection if any
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    this.isConnecting = true;
    logDebug("AgaveAgent", `Connecting to Agave agent WebSocket ${this.wsUrl}`);

    try {
      this.socket = new WebSocket(this.wsUrl);

      this.socket.onopen = () => {
        if (this.isDisposing) return;

        this.isConnecting = false;
        logDebug("AgaveAgent", "Connected to Agave agent WebSocket");
        this.state.connected = true;
        this.reconnectDelay = 500; // Reset delay on successful connection
        this.notifyListeners();
      };

      this.socket.onmessage = (event) => {
        if (this.isDisposing) return;

        try {
          const messageData = event.data as string;
          const data = JSON.parse(messageData) as Record<string, unknown>;

          // Check if the message has the expected format
          if (data && typeof data === "object") {
            // Handle different message formats
            if ("version" in data || "bank_slot" in data || "forks" in data) {
              // Expected format: {version, bank_slot, forks}
              this.state.version =
                typeof data.version === "string" ? data.version : null;
              this.state.bank_slot =
                typeof data.bank_slot === "number" ? data.bank_slot : null;
              this.state.forks =
                typeof data.forks === "number" ? data.forks : null;
            } else if ("hello" in data && data.hello === true) {
              // Initial hello message - keep existing state
              logDebug("AgaveAgent", "Received hello message from agent");
            } else {
              // Unknown format - log it
              logDebug("AgaveAgent", "Unknown message format from agent", data);
            }

            logDebug("AgaveAgent", "Updated state", this.state);
            this.notifyListeners();
          }
        } catch (e) {
          logWarning(
            "AgaveAgent",
            "Failed to parse agent message",
            e instanceof Error ? e.message : String(e),
          );
        }
      };

      this.socket.onclose = (event) => {
        if (this.isDisposing) return;

        this.isConnecting = false;
        logDebug(
          "AgaveAgent",
          `Disconnected from Agave agent (code: ${event.code}), reconnecting in ${this.reconnectDelay}ms`,
        );
        this.state.connected = false;
        this.notifyListeners();
        this.scheduleReconnect();
      };

      this.socket.onerror = (error) => {
        if (this.isDisposing) return;

        this.isConnecting = false;
        logWarning(
          "AgaveAgent",
          "WebSocket error",
          error instanceof Error ? error.message : "Unknown error",
        );
        this.state.connected = false;
        this.notifyListeners();
      };
    } catch (error) {
      logWarning("AgaveAgent", "Failed to create WebSocket connection", error);
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.isDisposing) return;

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    this.reconnectTimer = setTimeout(() => {
      if (!this.isDisposing) {
        this.connect();
        this.reconnectDelay = Math.min(
          this.reconnectDelay * 2,
          this.maxReconnectDelay,
        );
      }
    }, this.reconnectDelay);
  }

  subscribe(callback: (state: AgaveAgentState) => void): () => void {
    this.listeners.push(callback);

    // Immediately call with current state
    callback(this.state);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((cb) => cb(this.state));
  }

  dispose() {
    if (this.isDisposing) return;

    this.isDisposing = true;
    this.isConnecting = false;
    logDebug("AgaveAgent", "Disposing Agave agent client");

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.socket) {
      this.socket.onopen = null;
      this.socket.onclose = null;
      this.socket.onerror = null;
      this.socket.onmessage = null;
      this.socket.close();
      this.socket = null;
    }

    this.state.connected = false;
    this.notifyListeners();
  }
}

// Singleton instance
let agaveAgentInstance: AgaveAgentClient | null = null;

export function getAgaveAgentClient(wsUrl?: string): AgaveAgentClient {
  if (!agaveAgentInstance) {
    logDebug("AgaveAgent", "Creating new AgaveAgentClient instance", { wsUrl });
    agaveAgentInstance = new AgaveAgentClient(wsUrl);
  } else if (wsUrl && agaveAgentInstance.wsUrl !== wsUrl) {
    logDebug(
      "AgaveAgent",
      "URL changed, disposing old instance and creating new one",
      {
        oldUrl: agaveAgentInstance.wsUrl,
        newUrl: wsUrl,
      },
    );
    agaveAgentInstance.dispose();
    agaveAgentInstance = new AgaveAgentClient(wsUrl);
  } else {
    logDebug("AgaveAgent", "Reusing existing AgaveAgentClient instance");
  }
  return agaveAgentInstance;
}

export function disposeAgaveAgentClient() {
  if (agaveAgentInstance) {
    logDebug("AgaveAgent", "Disposing AgaveAgentClient instance");
    agaveAgentInstance.dispose();
    agaveAgentInstance = null;
  }
}
