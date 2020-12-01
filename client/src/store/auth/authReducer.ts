import { AuthState, AuthActionTypes } from './authTypes';
import { Reducer } from 'redux'
import { AuthActionReturns } from './authActions';
import { AuthUserGetDto } from 'dtos/AuthUserGetDto';

const INITIAL_STATE: AuthState = {
  user: null
}

const authReducer: Reducer<AuthState, AuthActionReturns> = (state = INITIAL_STATE, action: AuthActionReturns): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH_USER:
      return setAuthUser(state, action.payload)

    case AuthActionTypes.LOGOUT:
      return logout(state)
    default:
      return { ...state }
    // case AuthTypes.CHECK_USER_OR_LOGOUT:
  }
}

const setAuthUser = (state: AuthState, authUser: AuthUserGetDto): AuthState => {

  const expiresAt = new Date(authUser.expiresAt)

  localStorage.setItem('user', JSON.stringify(authUser))

  // Refresh logout timeout
  setTimeout(() => {
    return logout(state)
  }, expiresAt.getTime() - (new Date()).getTime())

  return { ...state, user: authUser }
}



const logout = (state: AuthState): AuthState => {
  localStorage.removeItem('user')
  return { ...state, user: null }
}

export default authReducer