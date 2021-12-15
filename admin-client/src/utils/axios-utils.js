import axios from 'axios';

import { getCookie } from './storage-helper';
import { logoutUser } from './user-helper';

export const sendRequest = async (args) => {
    try {
        const { url, headers, noAuth, data, params } = args;
        let headerParams;
        if (noAuth) {
            if (headers) {
                headerParams = {
                    ...headers,
                    authorization: getCookie('accessToken'),
                };
            } else {
                headerParams = {
                    authorization: getCookie('accessToken'),
                };
            }
        }
        const response = await axios({
            ...args,
            headers: headerParams,
            url: url,
            data,
            params,
        });
        return response;
    } catch (error) {
        logoutUser();
        return { error };
    }
};

export const getRequest = async (args) => {
    const { data, headers, error, status } = await sendRequest({
        ...args,
        method: 'get',
    });
    if (status === 200) {
        return {
            data,
            error: null,
            headers,
            status,
        };
    }
    return {
        data,
        error: error || data,
        status,
    };
};

export const postRequest = async (args) => {
    const { data, headers, error, status } = await sendRequest({
        ...args,
        method: 'post',
    });

    if ([200, 201, 204].indexOf(status) > -1) {
        return {
            data,
            error: null,
            headers,
            status,
        };
    }
    return {
        data: null,
        error: error || data,
        status,
    };
};

export const deleteRequest = async (args) => {
    const { data, error, status, headers } = await sendRequest({
        ...args,
        method: 'delete',
    });
    if ([200, 201, 204].indexOf(status) > -1) {
        return {
            data,
            error: null,
            headers,
            status,
        };
    }
    return {
        data: null,
        error: error || data,
        status,
    };
};
