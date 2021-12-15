import { LOGIN_URL } from 'configs/urls';
import { postRequest } from 'utils/axios-utils';

export const loginUser = async (data) => {
    return await postRequest({
        url: LOGIN_URL,
        data: data,
    });
};
