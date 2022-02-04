import React, { useCallback, useMemo, useState } from "react";
import {View} from "react-native";

function useLoading(loadingDefault = false, errorDefault = false) {
    const [loading, _setLoading] = useState(loadingDefault);
    const [error, _setError] = useState(errorDefault);

    const setError = useCallback((message) => {
        _setLoading(false); // Ведь нет ситуаций когда есть ошибка, но ещё не окончилась загрузка?
        _setError(message);
    }, []);

    const setLoading = useCallback((state) => {
        _setLoading(state);
        _setError(false);
    }, []);

    const start = useCallback(() => setLoading(true), [setLoading]);
    const stop = useCallback(() => setLoading(false), [setLoading]);


    return useMemo(() => ({
            loading,
            error,
            setLoading,
            setError,
            start,
            stop,
        }
    ), [
        loading,
        error,
        setLoading,
        setError,
        start,
        stop,
    ]);
}

export default useLoading;