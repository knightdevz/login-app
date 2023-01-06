import axios from 'axios';

axios.interceptors.request.use((config: any): any => {
  if (!config.headers.authorization) {
    const currentLocalStorage = localStorage.getItem('user');
    if (currentLocalStorage) {
      const json: ({ token: string; }) = JSON.parse(currentLocalStorage);

      const { token } = json;

      config.params = { "token": token }
      config.headers.Authorization = token ? `Bearer ${token}` : '';
    }
  }

  return config;
});


export default axios;
