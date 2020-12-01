import { AuthUserGetDto } from 'dtos/AuthUserGetDto';

export enum AuthActionTypes {
    SET_AUTH_USER = '@auth/SET_AUTH_USER',
    // CHECK_USER_OR_LOGOUT = '@auth/CHECK_USER_OR_LOGOUT',
    LOGOUT = '@auth/LOGOUT'
}

export interface AuthState{
    user: AuthUserGetDto
}

