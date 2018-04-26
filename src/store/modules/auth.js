import { AUTH_ERROR, AUTH_LOGOUT, AUTH_REQUEST, AUTH_SUCCESS } from '../actions/auth'
import { USER_REQUEST } from '../actions/user'
import axios from 'axios';
import * as config from '../../config/config';

const state = { token: localStorage.getItem('user-token') || '', status: '', hasLoadedOnce: false };
const baseUrl = config[process.env.NODE_ENV].baseUrl;

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getToken: state => state.token
};

const actions = {
    [AUTH_REQUEST]: ({ commit, dispatch }, credentials) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            axios.post(`${baseUrl}/users/login`, credentials)
                .then(response => {
                    console.log(response, 'login');
                    localStorage.setItem('user-token', response.headers['x-auth']);
                    axios.defaults.headers.common['x-auth'] = response.headers['x-auth'];
                    commit(AUTH_SUCCESS, response);
                    dispatch(USER_REQUEST);
                    resolve(response)
                })
                .catch((err) => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem('user-token');
                    reject(err)
                });
        })
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem('user-token');
            axios.delete(`${baseUrl}/users/me/token`)
                .then(response => {
                    console.log(response, 'logout');
                    delete axios.defaults.headers.common['x-auth']
                    resolve();
                })
                .catch((err) => {
                    reject(err)
                });

        })
    }
};

const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, response) => {
        state.status = 'success';
        state.token = response.headers['x-auth'];
        state.hasLoadedOnce = true
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error';
        state.hasLoadedOnce = true
    },
    [AUTH_LOGOUT]: (state) => {
        state.token = ''
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}
