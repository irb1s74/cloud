import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ROOT_URL } from '../helpers/ROOT_URL';
import { IFile } from '../models/IFile';

const fileAPI = createApi({
  reducerPath: 'fileAPI',
  baseQuery: fetchBaseQuery({ baseUrl: ROOT_URL }),
  endpoints: (build) => ({
    getFiles: build.query<
      IFile[],
      { parentId: number; sort: string; token: string }
    >({
      query: ({ parentId, sort, token }) => ({
        url: `file/${parentId}/${sort}`,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + token,
        },
        method: 'GET',
      }),
    }),
  }),
});
export default fileAPI;
