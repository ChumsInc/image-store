import Alert from "react-bootstrap/Alert";
import {type SerializedError} from "@reduxjs/toolkit";

export default function ErrorBoundaryFallback({error}: {
    error: Error | SerializedError;
    resetErrorBoundary: () => void;
}) {
    return (
        <Alert variant="danger">
            <Alert.Heading>Yikes!</Alert.Heading>
            {error.message}
        </Alert>
    )
}
