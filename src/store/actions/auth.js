import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        } , expirationTime * 1000)
    }
}

export const auth = (email , password , isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD1i81sAOYEORV3YSV3z66IrRC_sqEtC-8'
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD1i81sAOYEORV3YSV3z66IrRC_sqEtC-8'
        }
        axios.post( url , authData)
            .then( response => {
                console.log(response.data);
                dispatch(authSuccess(response.data.idToken , response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch( err => {
                console.log(err.response.data.error);
                dispatch(authFail(err.response.data.error))
            })
    }
}