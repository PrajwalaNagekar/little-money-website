import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
        "apikey": "11111111-1111-1111-1111-111111111111",
        "Content-Type": "application/ json"
    }
});

export const EligibleCheck = async (data) => {
    try {
        const response = await api.post('/partner/dedupe', data);
        return response;
    } catch (error) {
        console.log(error);

    }
}
