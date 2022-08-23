import { ROOT_URL } from '../helpers/ROOT_URL';
import axios, { AxiosResponse } from 'axios';

export default class AuthService {
  static async Login(token: string): Promise<AxiosResponse> {
    return axios
      .post(
        '/auth/login',
        {
          token,
        },
        {
          withCredentials: false,
          baseURL: ROOT_URL,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e.response;
      });
  }
}
// const authAPI = createApi({
//   reducerPath: 'authAPI',
//   baseQuery: fetchBaseQuery({ baseUrl: ROOT_URL }),
//   endpoints: (build) => ({
//     authLogin: build.mutation<IUser, string>({
//       query: (token: string) => ({
//         url: `auth/login`,
//         method: 'POST',
//         body: { token },
//       }),
//     }),
//   }),
// });
// export default authAPI;
