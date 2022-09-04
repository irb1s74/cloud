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
      { path: string | undefined; token: string; name: string }
    >({
      query: ({ path = '', token, name }) => ({
        url: `file/create`,
        body: { name, path },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + token,
        },
        method: 'POST',
      }),
      invalidatesTags: ['Files'],
    }),
    uploadFile: build.mutation<IFile[], { token: string; formData: FormData }>({
      query: ({ token, formData }) => ({
        url: `file/upload`,
        body: formData,
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + token,
        },
        method: 'POST',
      }),
      invalidatesTags: ['Files'],
    }),
    deleteFile: build.mutation<IFile[], { token: string; fileId: number }>({
      query: ({ token, fileId }) => ({
        url: `file/delete/${fileId}`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + token,
        },
        method: 'DELETE',
      }),
      invalidatesTags: ['Files'],
    }),
  }),
});
export default fileAPI;
