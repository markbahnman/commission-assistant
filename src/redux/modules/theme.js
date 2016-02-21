// For holding state related to the http request object

const LOAD = 'commission-assistant/theme/LOAD';

const initialState = { loaded: false };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: true,
        base: action.base
      };
    default:
      return state;
  }
}

export function loadTheme(theme) {
  return {
    type: LOAD,
    base: theme.baseTheme
  };
}

export function isLoaded(state) {
  return state.theme && state.theme.loaded;
}
