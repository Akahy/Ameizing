import api from './api';

export default {
    retrieveToken(code: string) {
        const path = '/token';
        return api.post(path, {
            code,
            client_id: process.env.VUE_APP_CLIENT_ID,
            grant_type: 'authorization_code',
            redirect_uri: localStorage.getItem('redirectUri'),
        }).then((response) => response.data);
    },
};
