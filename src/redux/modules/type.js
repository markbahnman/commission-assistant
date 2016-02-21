const LOAD = 'commission-assistant/type/LOAD';
const LOAD_SUCCESS = 'commission-assistant/type/LOAD_SUCCESS';
const LOAD_FAIL = 'commission-assistant/type/LOAD_FAIL';
const CREATE = 'commission-assistant/type/CREATE';
const CREATE_SUCCESS = 'commission-assistant/type/CREATE_SUCCESS';
const CREATE_FAIL = 'commission-assistant/type/CREATE_FAIL';

const initialState = {
  loaded: false,
  types: []
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
        types: action.result.types
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case CREATE:
      return {
        ...state,
        creating: true
      };
    case CREATE_SUCCESS:
      const types = [
        ...state.types,
        action.result.type
      ];
      return {
        ...state,
        loaded: true,
        creating: false,
        created: true,
        types: types
      };
    case CREATE_FAIL:
      return {
        ...state,
        loaded: true,
        creating: false,
        created: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function createType(name, description, price) {
  return {
    types: [CREATE, CREATE_SUCCESS, CREATE_FAIL],
    promise: (client) => client.post('/type', {
      data: {
        name: name,
        price: price,
        description: description
      }
    })
  };
}

export function isLoaded(globalState) {
  return globalState.type && globalState.type.loaded;
}

export function loadTypes() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/type')
  };
}
