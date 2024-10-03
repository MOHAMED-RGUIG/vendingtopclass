import axios from 'axios';
import Papa from 'papaparse';

export const getClt = () => async dispatch => {
    dispatch({ type: 'GET_CLT_REQUEST' });

    try {
        const response = await axios.get('../product_2024-06-03_164500.csv'); // Mettez à jour le chemin de votre fichier CSV
        const parsedData = Papa.parse(response.data, {
            header: true,
            skipEmptyLines: true,
        });
        dispatch({ type: 'GET_CLT_SUCCESS', payload: parsedData.data });
    } catch (error) {
        dispatch({ type: 'GET_CLT_FAILED', payload: error.message });
    }
};

export const getPiece = () => async dispatch => {
    dispatch({ type: 'GET_PCE_REQUEST' });

    try {
        const response = await axios.get('../pce_2024-06-03_164500.csv'); // Mettez à jour le chemin de votre fichier CSV
        const parsedData = Papa.parse(response.data, {
            header: true,
            skipEmptyLines: true,
        });
        dispatch({ type: 'GET_PCE_SUCCESS', payload: parsedData.data });
    } catch (error) {
        dispatch({ type: 'GET_PCE_FAILED', payload: error.message });
    }
};