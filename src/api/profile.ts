import api from './api';

export default {
    getProfile() {
        const path = '/me';
        return api.get(path).then((response) => response.data);
    },
};
