import axios from 'axios';

const API_URL = "http://localhost:4000/api/auth";

export const registerUser = async(data)=>{
    return axios.post(`${API_URL}/register`, data);
};

export const loginUser = async (data)=>{
    return axios.post(`${API_URL}/login`,data)
};