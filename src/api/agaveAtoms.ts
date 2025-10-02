import { atom } from "jotai";
import type { AgaveAgentState } from "../services/agaveAgent";

// Agave-specific atoms for the simplified data model
export const agaveVersionAtom = atom<string | null>(null);
export const agaveBankSlotAtom = atom<number | null>(null);
export const agaveForksAtom = atom<number | null>(null);
export const agaveConnectedAtom = atom<boolean>(false);

// Combined state atom for easy access
export const agaveAgentStateAtom = atom<AgaveAgentState>((get) => ({
  version: get(agaveVersionAtom),
  bank_slot: get(agaveBankSlotAtom),
  forks: get(agaveForksAtom),
  connected: get(agaveConnectedAtom),
}));

// Action atoms for updating state
export const setAgaveVersionAtom = atom(
  null,
  (_, set, version: string | null) => {
    set(agaveVersionAtom, version);
  },
);

export const setAgaveBankSlotAtom = atom(
  null,
  (_, set, bank_slot: number | null) => {
    set(agaveBankSlotAtom, bank_slot);
  },
);

export const setAgaveForksAtom = atom(null, (_, set, forks: number | null) => {
  set(agaveForksAtom, forks);
});

export const setAgaveConnectedAtom = atom(
  null,
  (_, set, connected: boolean) => {
    set(agaveConnectedAtom, connected);
  },
);

// Combined update action
export const updateAgaveAgentStateAtom = atom(
  null,
  (_, set, state: Partial<AgaveAgentState>) => {
    if (state.version !== undefined) {
      set(agaveVersionAtom, state.version);
    }
    if (state.bank_slot !== undefined) {
      set(agaveBankSlotAtom, state.bank_slot);
    }
    if (state.forks !== undefined) {
      set(agaveForksAtom, state.forks);
    }
    if (state.connected !== undefined) {
      set(agaveConnectedAtom, state.connected);
    }
  },
);
