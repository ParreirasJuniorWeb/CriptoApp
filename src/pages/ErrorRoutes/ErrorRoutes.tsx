import type { IErrorResponseProps } from "../../types/IErrorResponseProps";

import {
    useRouteError,
    isRouteErrorResponse
} from "react-router-dom";

import styles from "./ErrorRoutes.module.css";

const ErrorRoutes = () => {
    const error = useRouteError();
    const isRouteError = isRouteErrorResponse(error);

    return (
        <div className={styles.ErrorRoutes}>
            <h1 className={styles.ErrorRoutes__title}>Opss... Algo deu errado!</h1>
            <p className={styles.ErrorRoutes__message}>
                {isRouteError ? (error as IErrorResponseProps).statusText : "Ocorreu um erro inesperado."}
            </p>
            <button className={styles.ErrorRoutes__button} onClick={() => window.location.href = "/"}>Voltar para a Home</button>
        </div >
    );
};

export default ErrorRoutes;