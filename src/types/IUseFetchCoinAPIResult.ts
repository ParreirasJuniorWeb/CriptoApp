import type { ICoinProps } from "./ICoinProps";

export interface IUseFetchCoinAPIResult {
    coins: ICoinProps[];
    loading: boolean;
    error: string | null;
    refetch: (offset: number = 0, quantity: number = 10) => Promise<void>;
};