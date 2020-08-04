import axios from "axios";
import { AsyncStorage } from "react-native";

const apiUrl = "https://code-class.herokuapp.com";
const api = axios.create({
    baseURL: `${apiUrl}/api`,
});

api.interceptors.request.use(async function (config) {
    const token = await AsyncStorage.getItem("token");
    config.headers.token = token ? token : "";
    config["Content-Type"] = "application/json";
    return config;
});

const BaseApi = () => {
    return {
        async get(endpoint) {
            try {
                const res = await api.get(endpoint);
                return res;
            } catch (error) {
                return error.response;
            }
        },

        async post(endpoint, body, contentType) {
            try {
                const res = await api.post(
                    endpoint,
                    body,
                    contentType === "formData" && { headers: { "content-type": "multipart/form-data" } }
                );
                return res;
            } catch (error) {
                return error.response;
            }
        },
        async put(endpoint, body) {
            try {
                const res = await api.put(endpoint, body);
                return res;
            } catch (error) {
                return error.response;
            }
        },
        async patch(endpoint, body) {
            try {
                const res = await api.patch(endpoint, body);
                return res;
            } catch (error) {
                return error.response;
            }
        },
        async delete(endpoint) {
            try {
                const res = await api.delete(endpoint);
                return res;
            } catch (error) {
                return error.response;
            }
        },
    };
};

export default BaseApi;
