const PREAUTH = 'commission-assistant/auth/PREAUTH';
const LOAD = 'commission-assistant/auth/LOAD';
const LOAD_SUCCESS = 'commission-assistant/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'commission-assistant/auth/LOAD_FAIL';
const SIGNUP = 'commission-assistant/auth/SIGNUP';
const SIGNUP_SUCCESS = 'commission-assistant/auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'commission-assistant/auth/SIGNUP_FAIL';
const LOGIN = 'commission-assistant/auth/LOGIN';
const LOGIN_SUCCESS = 'commission-assistant/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'commission-assistant/auth/LOGIN_FAIL';
const LOGOUT = 'commission-assistant/auth/LOGOUT';
const LOGOUT_SUCCESS = 'commission-assistant/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'commission-assistant/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SIGNUP:
      return {
        ...state,
        signingUp: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
        user: action.result.user
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        signingUp: false,
        user: null,
        signupError: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result.user
      };
    case LOGIN_FAIL:
      console.log('LOGIN_FAIL action', action.error);
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case PREAUTH:
      return {
        ...state,
        user: {
          name: action.user
        }
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

export function signup(name, email, password) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: (client) => client.post('/signup', {
      data: {
        username: name,
        password: password,
        email: email
      }
    })
  };
}

export function login(name, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        username: name,
        password: password
      }
    })
  };
}

export function preauth(cookie) {
  return {
    type: PREAUTH,
    user: cookie
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}
