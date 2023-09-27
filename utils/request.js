import axios from 'axios';

class Requests {
    static async makeGetRequest(url) {
        try {
            const response = await axios.get(url, { validateStatus: false });
            if (response.status === 503 || response.status === 500) {
                return {
                    message: 'Service not available.',
                    status: false,
                    status_code: 503,
                };
            }

            const data = response.data;
            data.status_code = response.status;
            return data;
        } catch (error) {
            return {
                message: 'Service not available.',
                status: false,
                status_code: 503,
            };
        }
    }

    static async makePostRequest(url, data = null, camelize = true) {
        try {
            let response;
            if (data && camelize) {
                const json_data = {};
                for (const [key, value] of Object.entries(data)) {
                    json_data[convertToCamel(key)] = value;
                }
                response = await axios.post(url, json_data, { validateStatus: false, timeout: 10000 });
            } else if (!camelize) {
                response = await axios.post(url, data, { validateStatus: false, timeout: 10000 });
            } else {
                response = await axios.post(url, null, { validateStatus: false, timeout: 10000 });
            }

            if (response.status === 503 || response.status === 500) {
                return {
                    message: 'Service not available.',
                    status: false,
                    status_code: 503,
                };
            }

            const responseData = response.data;
            responseData.status_code = response.status;
            return responseData;
        } catch (error) {
            return {
                message: 'Service not available.',
                status: false,
                status_code: 503,
            };
        }
    }

    static async makePutRequest(url, data) {
        try {
            const json_data = {};
            for (const [key, value] of Object.entries(data)) {
                json_data[convertToCamel(key)] = value;
            }
            const response = await axios.put(url, json_data, { validateStatus: false });
            if (response.status === 503 || response.status === 500) {
                return {
                    message: 'Service not available.',
                    status: false,
                    status_code: 503,
                };
            }

            const responseData = response.data;
            responseData.status_code = response.status;
            return responseData;
        } catch (error) {
            return {
                message: 'Service not available.',
                status: false,
                status_code: 503,
            };
        }
    }

    static async makeDeleteRequest(url) {
        try {
            const response = await axios.delete(url, { validateStatus: false, timeout: 10000 });
            if (response.status === 503 || response.status === 500) {
                return {
                    message: 'Service not available.',
                    status: false,
                    status_code: 503,
                };
            }

            const responseData = response.data;
            responseData.status_code = response.status;
            return responseData;
        } catch (error) {
            return {
                message: 'Service not available.',
                status: false,
                status_code: 503,
            };
        }
    }
}

export default Requests;
