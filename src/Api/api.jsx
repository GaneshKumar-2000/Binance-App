import axios from "axios";

const API = axios.create();

export const GetAPI = async (url, callback) => {
    await API.get(url)
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            callback(error);
        });
};