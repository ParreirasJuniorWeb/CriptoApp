// import react-router-dom components
import { Link, useParams, useNavigate } from "react-router-dom";

// impórt custom hook
import { useFetchCoinDetails } from "../../hook/useFetchCoinDetails";

// import types 
import type { ICoinProps } from "../../types/ICoinProps";

// import helper functions
import {
    price,
    priceCompact
} from "../../utils/FormatterFunctions/CurrencyFormatter";

// import CCS file
import styles from "./CriptoDetails.module.css";

const LoadingView = () => <p className={styles.loading}>Carregando todos os dados...</p>;

const ErrorView = ({ error, onRetry, coinName }: { error: string | null; onRetry: (coinName: string) => void; coinName: string }) => (
    <div className="errorContainer">
        <div className="errorMessage">
            <h1>Ops! Algo de errado na aplicação!</h1>
            <p>Descrição do erro: </p>
            <p>{error}</p>
            <div className="btn-container">
                {/* Passamos o nome da moeda atual ou vazio para o retry */}
                <button onClick={() => onRetry(coinName || "")}>Limpar página</button>
                <Link to="/">Voltar para a página Home</Link>
            </div>
        </div>
    </div>
);

const CriptoDetails = () => {
    const { cripto } = useParams();
    const navigateTo = useNavigate();

    // 3. Buscar dados passando o parâmetro já validado (sem necessidade do "||)
    const { coin, loading, error, refetch } = useFetchCoinDetails(cripto || "");

    // Se for nulo, vazio ou undefined, redireciona e PARA a execução deste render.
    if (!cripto) {
        navigateTo("/");
        return null; // Ou return <></> para Renderizar nada
    }

    // 4. FLUXO LINEAR: Verifica estados (Loading e Erro) em ordem
    if (loading) return <LoadingView />;

    if (error && !coin) return (
        <ErrorView
            error={error}
            onRetry={refetch}
            coinName={cripto} // Passa o valor atual para tentar refazer a requisição
        />
    );

    console.log("Dados da moeda:", coin); // Log para verificar os dados recebidos

    const coinData = Array.isArray(coin) ? coin[0] : coin;
    const {
        name,
        symbol,
        priceUsd,
        changePercent24Hr,
        marketCapUsd,
        volumeUsd24Hr,
        explorer,
    } = (coinData ?? {}) as ICoinProps;
    // Desestruturação segura para evitar erros de acesso a propriedades

    console.log("Dados desestruturados:", { name, symbol, priceUsd, changePercent24Hr, marketCapUsd, volumeUsd24Hr });
    // Log para verificar os dados desestruturados

    return (
        <div className={styles.CriptoDetails}>
            <div className={styles.backButtonContainer}>
                <Link to="/" className={styles.backButton}>Voltar</Link>
            </div>
            <div className={styles.coinImageContainer}>
                <img
                    src={`https://assets.coincap.io/assets/icons/${symbol.toLocaleLowerCase()}@2x.png`}
                    alt={`${name} Logo`}
                    className={styles.coinImage}
                />
            </div >
            <h1 className={styles.center}>{name || `Detalhes da Moeda ${cripto}`} ({symbol})</h1>
            <div className={styles.priceContainer}>
                <h2>Preço Atual:</h2>
                <p className={styles.price}>Preço: {price.format(Number(priceUsd) || 0)}</p>
                <p className={styles.priceCompact}>Preço Mercado: {priceCompact.format(Number(marketCapUsd) || 0)}</p>
                <p className={styles.priceCompact}>Preço de Volume: {priceCompact.format(Number(volumeUsd24Hr) || 0)}</p>
            </div>
            <div className={styles.statsContainer}>
                <h2>Estatísticas:</h2>
                <p className={Number(changePercent24Hr) > 0 ? styles.profit : styles.loss}>Variação 24h: {Number(changePercent24Hr).toFixed(2)}%</p>
            </div>
            <div className={styles.explorerContainer}>
                <h2>Explorar:</h2>
                <a href={explorer} target="_blank" rel="noopener noreferrer" className={styles.explorerLink}>
                    Ver no CoinCap Explorer
                </a>
            </div>
        </div >
    );
};

export default CriptoDetails;