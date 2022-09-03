import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { ROOT_URL } from '../helpers/ROOT_URL';
import { IFile } from '../models/IFile';

const fileAPI = createApi({
  reducerPath: 'fileAPI',
  baseQuery: fetchBaseQuery({ baseUrl: ROOT_URL }),
  tagTypes: ['Files'],
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
      providesTags: (result) => ['Files'],
    }),
    getFilesByPath: build.query<
      IFile[],
      { path: string | undefined; token: string }
    >({
      query: ({ path = '', token }) => ({
        url: `file/path`,
        body: { path },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + token,
        },
        method: 'POST',
      }),
      providesTags: (result) => ['Files'],
    }),
    createDir: build.mutation<
      IFile[],
      { parentId: number | undefined; token: string; name: string }
    >({
      query: ({ parentId = 0, token, name }) => ({
        url: `file/create`,
        body: { name, parent: parentId },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + token,
        },
        method: 'POST',
      }),
      invalidatesTags: ['Files'],
    }),
  }),
});
export default fileAPI;
