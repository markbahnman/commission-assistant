export const LOGIN_MODAL = 'commission-assistant/modal/login';
export const HIDE_MODAL = 'commission-assistant/modal/hide';

const initialState = {
  modalType: null,
  modalProps: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_MODAL:
      return {
        ...state,
        modalType: action.modalType,
        modalProps: action.modalProps
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}

export function loginModal() {
  return {
    type: LOGIN_MODAL,
    modalType: LOGIN_MODAL,
    modalProps: {}
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL
  };
}
