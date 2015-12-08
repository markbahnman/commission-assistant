const CREATE_OPENING = 'commission-assistant/opening/CREATE';
const CREATE_OPENING_SUCCESS = 'commission-assistant/opening/CREATE_SUCCESS';
const CREATE_OPENING_FAIL = 'commission-assistant/opening/CREATE_FAIL';

const initialState = {
  created: false,
  openings: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_OPENING:
      return {
        ...state,
        creating: true
      };
    case CREATE_OPENING_SUCCESS:
      const openings = [...state.openings];
      openings.push(action.opening);
      return {
        ...state,
        creating: false,
        created: true,
        openings: openings
      };
    case CREATE_OPENING_FAIL:
      return {
        ...state,
        creating: false,
        created: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function createOpening(title) {
  return {
    types: [CREATE_OPENING, CREATE_OPENING_SUCCESS, CREATE_OPENING_FAIL],
    promise: (client) => client.post('/createOpening', {
      data: {
        title: title
      }
    })
  };
}
