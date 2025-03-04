import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export class FetchData {
    constructor() {
        this.api = axios.create({
            baseURL: API_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            // withCredentials: true, // Для кук и сессий, если нужно
        });
    }

    async get(endpoint, params = {}) {
        try {
            const response = await this.api.get(endpoint, { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            return {
                status: error.response.status,
                data: error.response.data,
                message: error.message
            };
        } else if (error.request) {
            return {
                message: 'No response received from the server',
                request: error.request
            };
        } else {
            return {
                message: error.message
            };
        }
    }
}

const api = new FetchData();
export default api;
