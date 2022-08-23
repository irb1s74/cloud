import { IUser } from '../../../models/IUser';

export interface AuthState {
  user: IUser;
  isAuth: boolean;
  isAuthLoading: boolean;
  messageError: string;
}

export enum AuthActionEnum {
  SET_USER = 'SET_USER',
  SET_AUTH_LOADING = 'SET_AUTH_LOADING',
  SET_MESSAGE_ERROR = 'SET_MESSAGE_ERROR',
}

export interface IAuthSetUser {
  type: AuthActionEnum.SET_USER;
  payload: {
    user: IUser;
    isAuth: boolean;
  };
}

export interface IAuthSetLoading {
  type: AuthActionEnum.SET_AUTH_LOADING;
  payload: boolean;
}

export interface IAuthSetMessageError {
  type: AuthActionEnum.SET_MESSAGE_ERROR;
  payload: string;
}

export type AuthAction = IAuthSetUser | IAuthSetMessageError | IAuthSetLoading;
