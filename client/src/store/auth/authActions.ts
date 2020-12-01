import { AuthUserGetDto } from '../../dtos/AuthUserGetDto';
import { AuthActionTypes } from './authTypes';
import { action } from 'typesafe-actions'
import { Dispatch } from 'redux';

export const setAuthUser = (authUser: AuthUserGetDto) => action(AuthActionTypes.SET_AUTH_USER, authUser)
const logout = () => action(AuthActionTypes.LOGOUT)

// export const checkUserOrLogout = () => action(AuthTypes.CHECK_USER_OR_LOGOUT)

export const checkAuthOrLogoutActionCreator  = (dispatch: Dispatch) => {
    const userStr = localStorage.getItem('user')
    if (!userStr)
      return logout()
  
    const user: AuthUserGetDto = JSON.parse(userStr)
    if (new Date(user.expiresAt) <= new Date())
      return logout()
  
    return setAuthUser(user)
  }

export const logoutActionCreator = (dispatch: Dispatch) => {
    // dispatch some other action
    return logout()
}

export type AuthActionReturns =
    ReturnType<typeof setAuthUser> |
    ReturnType<typeof logout> 