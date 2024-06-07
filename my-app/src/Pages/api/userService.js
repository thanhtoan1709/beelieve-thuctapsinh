import axios from 'axios';

export const apiGetOne = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:5000/api/v1/user/',
        headers: {
          'access token': token ? `Bearer ${token} ` : null,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
