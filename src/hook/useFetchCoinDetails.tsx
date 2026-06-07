import { useCallback, useEffect, useState } from "react";
import { getCoinDetails } from "../services/api/api";
import type { ICoinProps } from "../types/ICoinProps";
import type { IUseFetchCoinDetails } from "../types/IUseFetchCoinDetails";

export const useFetchCoinDetails = (cripto: string): IUseFetchCoinDetails => {
    const [coin, setCoin] = useState<ICoinProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (cripto: string) => {
        setLoading(true);
        setError(null);

        try {
            if (cripto) {
                const data = await getCoinDetails(cripto);
                setCoin(data.data);
            } else {
                setError("ID da moeda não fornecido. Verifique a URL e tente novamente.");
                throw new Error("ID da moeda não fornecido. Verifique a URL e tente novamente.");
            }
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
        fetchData(cripto);
    }, [fetchData, cripto]);

    return {
        coin,
        loading,
        error,
        refetch: fetchData
    };
};