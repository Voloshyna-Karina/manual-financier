import axios from 'axios';

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';

export class FetchData {
    get(url, requestParams, headers) {
        return this.makeRequest(url, METHOD_GET, null, requestParams, headers);
    }

    post(url, body, requestParams, headers) {
        return this.makeRequest(url, METHOD_POST, body, requestParams, headers);
    }

    put(url, body, requestParams) {
        return this.makeRequest(url, METHOD_PUT, body, requestParams);
    }

    deleteApi(url, requestParams) {
        return this.makeRequest(url, METHOD_DELETE, null, requestParams);
    }

    delete(url, body, requestParams, headers) {
        return this.makeRequest(url, METHOD_DELETE, body, requestParams, headers);
    }

    async makeRequest(url, method, body, reqParams, headers) {
        const requestParams = {
            method: method || METHOD_GET,
            params: {
                ...(reqParams || {})
            },
            headers: {
                ...(headers || {}),
                'Accept': 'application/json',
            }
        };

        if (body instanceof FormData) {
            requestParams.data = body;
            delete requestParams.headers['Content-Type'];
        } else {
            requestParams.data = body ? JSON.stringify(body) : null;
            requestParams.headers['Content-Type'] = 'application/json';
        }

        if (!requestParams.responseType) {
            requestParams.responseType = this.shouldUseBlob(url) ? 'blob' : 'json';
        }

        return this.sendRequest(url, requestParams);
    }

    shouldUseBlob(url) {
        return url.includes('/preview') || url.includes('/download');
    }

    sendRequest(url, requestParams) {
        return new Promise((resolve, reject) => {
            axios(url, requestParams)
                .then(result => resolve(result))
                .catch(reason => {
                    const error = this.requestFailed(reason);
                    reject(error);
                });
        });
    }

    requestFailed(reason) {
        if (reason.response) {
            return {
                status: reason.response.status,
                headers: reason.response.headers,
                data: reason.response.data
            };
        } else if (reason.request) {
            return {
                message: 'No response received from the server',
                request: reason.request
            };
        } else {
            return {
                message: reason.message,
                config: reason.config
            };
        }
    }
}

const api = new FetchData();

export default api;
