// For holding state related to the http request object

const LOAD = 'commission-assistant/req/LOAD';

const initialState = { loaded: false };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: true,
        agent: action.agent
      };
    default:
      return state;
  }
}

export function loadUserAgent(req) {
  return {
    type: LOAD,
    agent: req.headers['user-agent']
  };
}

export function isAgentLoaded(state) {
  return state.req && state.req.loaded;
}
