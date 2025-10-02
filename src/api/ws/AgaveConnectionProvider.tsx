import { useSetAtom } from "jotai";
import type { PropsWithChildren } from "react";
import { useCallback, useEffect, useRef } from "react";
import {
  getAgaveAgentClient,
  disposeAgaveAgentClient,
} from "../../services/agaveAgent";
import { AGENT_CONFIG } from "../../config/agent";
import { updateAgaveAgentStateAtom } from "../agaveAtoms";
import type { AgaveAgentState } from "../../services/agaveAgent";

export function AgaveConnectionProvider({ children }: PropsWithChildren) {
  const updateAgaveState = useSetAtom(updateAgaveAgentStateAtom);
  const isInitialized = useRef(false);

  const handleAgentStateChange = useCallback(
    (state: AgaveAgentState) => {
      updateAgaveState(state);
    },
    [updateAgaveState],
  );

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (isInitialized.current) return;
    isInitialized.current = true;

    const agentClient = getAgaveAgentClient(AGENT_CONFIG.wsUrl);
    const unsubscribe = agentClient.subscribe(handleAgentStateChange);

    // Add a small delay before connecting to avoid race conditions
    const connectTimer = setTimeout(() => {
      agentClient.connect();
    }, 100);

    return () => {
      clearTimeout(connectTimer);
      unsubscribe();
      // Only dispose on unmount, not on re-renders
      if (isInitialized.current) {
        disposeAgaveAgentClient();
        isInitialized.current = false;
      }
    };
  }, [handleAgentStateChange]);

  return <>{children}</>;
}
