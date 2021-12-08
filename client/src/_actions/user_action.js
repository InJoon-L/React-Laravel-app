import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    let userId = 0;
    if (window.localStorage.getItem('userId')) {
        userId = window.localStorage.getItem('userId')
    }
    let val = {
        'id' : userId
    }
    const request = axios.post(`${USER_SERVER}/auth`, val)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    let token = window.localStorage.getItem('token');
    
    const request = axios.get(`${USER_SERVER}/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

