import type { ICoinProps } from "../../types/ICoinProps";

const API_KEY = import.meta.env.REACT_APP_COINCAP_API_KEY;

interface ApiResponse {
    data: ICoinProps[];
    timestamp: number;
}

export const getCoinAPIData = async (offset: number = 0, quantity: number = 10): Promise<ICoinProps[]> => {
    try {
        const response = await fetch(
            `https://rest.coincap.io/v3/assets?limit=${quantity}&offset=${offset}&apiKey=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        return data.data;

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return [];
    }
};

interface GetCoinDetails {
    data: ICoinProps;
    timestamp: number;
    error?: string;
}

export const getCoinDetails = async (cripto: string): Promise<GetCoinDetails> => {
    try {
        // 1. URL corrigida com parâmetro correto (ids=)
        const response = await fetch(
            `https://rest.coincap.io/v3/assets?ids=${cripto}&apiKey=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data: GetCoinDetails = await response.json();

        // 2. Verificação de erro APÓS converter para JSON
        if (data.error) {
            console.log("Moeda não encontrada!");
            return {
                timestamp: data.timestamp,
                data: null as unknown as ICoinProps, // Força tipo para manter consistência
                error: data.error
            };
        }

        return {
            timestamp: data.timestamp,
            data: data.data,
            error: data.error
        };

    } catch (error) {
        console.error("Erro ao buscar dados:", error);

        // 3. Retorna objeto de erro consistente com o tipo
        return {
            timestamp: Date.now(),
            data: null as unknown as ICoinProps, // Força tipo para manter consistência
            error: error instanceof Error ? error.message : "Erro desconhecido"
        };
    }
};