const LOAD = 'commission-assistant/opening/LOAD';
const LOAD_SUCCESS = 'commission-assistant/opening/LOAD_SUCCESS';
const LOAD_FAIL = 'commission-assistant/opening/LOAD_FAIL';
const CREATE_OPENING = 'commission-assistant/opening/CREATE';
const CREATE_OPENING_SUCCESS = 'commission-assistant/opening/CREATE_SUCCESS';
const CREATE_OPENING_FAIL = 'commission-assistant/opening/CREATE_FAIL';

const initialState = {
  loaded: false,
  openings: []
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
        openings: action.result.openings
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case CREATE_OPENING:
      return {
        ...state,
        creating: true
      };
    case CREATE_OPENING_SUCCESS:
      const openings = [...state.openings];
      openings.push(action.result.opening);
      return {
        ...state,
        loaded: true,
        creating: false,
        created: true,
        openings: openings
      };
    case CREATE_OPENING_FAIL:
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

export function createOpening(title, price, description) {
  return {
    types: [CREATE_OPENING, CREATE_OPENING_SUCCESS, CREATE_OPENING_FAIL],
    promise: (client) => client.post('/openings', {
      data: {
        title: title,
        price: price,
        description
      }
    })
  };
}

export function areOpeningsLoaded(globalState) {
  return globalState.opening && globalState.opening.loaded;
}

export function loadOpenings() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/openings')
  };
}
