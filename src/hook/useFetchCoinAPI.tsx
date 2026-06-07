import { useCallback, useEffect, useState } from "react";
import { getCoinAPIData } from "../services/api/api";
import type { ICoinProps } from "../types/ICoinProps";
import type { IUseFetchCoinAPIResult } from "../types/IUseFetchCoinAPIResult";

export const useFetchCoinAPI = (): IUseFetchCoinAPIResult => {
    const [coins, setCoins] = useState<ICoinProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (offset: number = 0, quantity: number = 10) => {
        setLoading(true);
        setError(null);

        try {
            const data = await getCoinAPIData(offset, quantity);
            setCoins(data);
        } catch (err) {
            const message = err instanceof Error
                ? err.message
                : "Erro ao carregar dados. Tente novamente mais tarde.";
            setError(message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        coins,
        loading,
        error,
        refetch: fetchData
    };
};