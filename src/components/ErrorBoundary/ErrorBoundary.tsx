import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import type { IErrorBoundary, IErrorFallback } from "../../types/IUseErrorBoundary";
// 1. Definindo as tipagens (Caso não tenha o arquivo IUseErrorBoundary, pode usar estas)
// Se você já tiver o arquivo, pode importar e usar no lugar destas interfaces.

// 2. O componente que renderiza a mensagem de erro
const ErrorFallback: React.FC<IErrorFallback> = ({ error, resetErrorBoundary }) => (
    <div
        role="alert"
        style={{
            padding: '20px',
            border: '1px solid #e57373',
            borderRadius: '8px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            margin: '20px',
            textAlign: 'center'
        }}
    >
        <h3 style={{ marginTop: 0 }}>Algo deu errado!</h3>
        <p>Detalhes do erro:</p>
        <pre style={{ background: '#fff', padding: '10px', overflow: 'auto' }}>
            {error?.message}
        </pre>
        <button
            onClick={resetErrorBoundary}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                marginTop: '10px'
            }}
        >
            Tentar novamente
        </button>
    </div>
);

// 3. O Wrapper Principal
const ErrorBoundaryComponent: React.FC<IErrorBoundary> = ({ children }) => {

    // Função opcional para tratar o erro (log, monitoramento, etc)
    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
        console.error('Erro capturado pelo ErrorBoundary:', error, errorInfo);
        // Aqui você pode adicionar uma chamada para API de log (ex: Sentry)
    };

    return (
        // Não precisa de "as React.FC", basta passar o componente diretamente
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={handleError}
        >
            {children}
        </ReactErrorBoundary>
    );
};

export default ErrorBoundaryComponent;