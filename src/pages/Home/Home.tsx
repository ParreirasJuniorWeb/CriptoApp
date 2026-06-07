// import CSS file
import styles from "./Home.module.css";
import { Search } from 'lucide-react';
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

// import custom hook
import { useFetchCoinAPI } from "../../hook/useFetchCoinAPI";

// import helper functions
import {
    price,
    priceCompact
} from "../../utils/FormatterFunctions/CurrencyFormatter";

const quant = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 30, 40, 50, 75, 100];

const Home = () => {

    const [input, setInput] = useState("");
    const [offset, setOffset] = useState(0);
    const [quantity, setQuantity] = useState(10);

    const { coins, loading, error, refetch } = useFetchCoinAPI();

    const navigateTo = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (input === "") return;

        navigateTo(`/criptoDetails/${input}`);
    };

    const handleGetMore = () => {
        if (offset === 0) {
            setOffset(10);
            refetch(offset, quantity);
            return;
        } else {
            // 1. Calcule o novo valor ANTES de chamar o refetch
            const nextOffset = offset + 10;

            // 2. Atualize o estado (opcional, pois o React vai atualizar, mas já temos o valor em memória)
            setOffset(nextOffset);

            // 3. Execute o fetch com o valor CALCULADO (não o estado antigo)
            refetch(nextOffset, quantity);
        }
    };

    const handleQuantity = (newQuantity: number) => {
        // Ao mudar a quantidade, resetar o offset para 0
        const resetOffset = 0;

        setOffset(resetOffset);
        setQuantity(newQuantity); // Supondo que você tenha setQuantity no estado

        refetch(resetOffset, newQuantity);
    };

    if (error) return (
        <div className="errorContainer">
            <div className="errorMessage">
                <h1>Ops! Algo de errado na aplicação!</h1>
                <p>Descrição do erro: </p>
                <p>{error}</p>
                <div className="btn-container">
                    <button onClick={() => refetch(offset, quantity)}>Limpar página</button>
                    <Link to="/">Voltar para a página Home</Link>
                </div>
            </div>
        </div>
    );

    return (
        <main className={styles.home}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite o nome da moeda... Ex: bitcoin"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">
                    <Search size={30} color="#FFF" />
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope="col">Moeda</th>
                        <th scope="col">Valor mercado</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Volume</th>
                        <th scope="col">Mudança 24h</th>
                    </tr>
                </thead>

                <tbody id="tbody">
                    {loading && <p className={styles.loading}>Carregando todos os dados...</p>}
                    {coins && !loading
                        && coins.length > 0 && coins.map((coin) => (
                            <tr className={styles.tr} key={coin.id}>
                                <td className={styles.tdLabel} data-label="Moeda">
                                    <div className={styles.name}>
                                        <img
                                            className={styles.logoCoin}
                                            src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLocaleLowerCase()}@2x.png`}
                                            alt="logo Cripto"
                                        />
                                        <Link to={`/criptoDetails/${coin.id}`}>
                                            <span>{coin.name}</span> | {coin.symbol}
                                        </Link>
                                    </div>
                                </td>

                                <td className={styles.tdLabel} data-label="Valor mercado">
                                    <span>{priceCompact.format(Number(coin.marketCapUsd))}</span>
                                </td>

                                <td className={styles.tdLabel} data-label="Preço">
                                    <span>{price.format(Number(coin.priceUsd))}</span>
                                </td>

                                <td className={styles.tdLabel} data-label="Volume">
                                    <span>{priceCompact.format(Number(coin.volumeUsd24Hr))}</span>
                                </td>

                                <td className={
                                    Number(coin.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss
                                } data-label="Mudança 24h">
                                    <span>{Number(coin.changePercent24Hr).toFixed(3)}</span>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table >

            <div className={styles.btnContainer}>
                <button
                    className={styles.buttonMore}
                    onClick={handleGetMore}
                    disabled={loading ? true : false}
                >
                    Carregar mais...
                </button>

                <div className={styles.quantityBtnContainer}>
                    <label htmlFor="quantity">Quantidade:</label>
                    <select
                        name="quantity"
                        id="quantity"
                        className={styles.select}
                        onChange={(e) => handleQuantity(Number(e.target.value))}
                        disabled={loading ? true : false}
                    >
                        {quant.map((q) => (
                            <option value={q} key={q}>
                                {q}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </main >
    );
};

export default Home;