import { ClaimData } from "src/types/claimData";
import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AppState {
  claimData?: ClaimData;
  setClaimData: (claimData: ClaimData) => void;
}

export const useStore = create<AppState>()(
  devtools(
    persist((set) => ({
      claimData: undefined,
      setClaimData: (claimData: ClaimData) => set({ claimData }),
    })),
  ),
);
