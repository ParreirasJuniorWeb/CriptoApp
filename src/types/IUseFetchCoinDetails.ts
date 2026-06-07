import type { ICoinProps } from "./ICoinProps";

export interface IUseFetchCoinDetails {
    coin: ICoinProps | null;
    loading: boolean;
    error: string | null;
    refetch: (cripto: string) => Promise<void>;
};