import React from 'react';
import { connect } from 'react-redux';
import LoginModal from './Login';
import {
  LOGIN_MODAL
} from '../../redux/modules/modal';

const MODAL_COMPONENTS = {
  [LOGIN_MODAL]: LoginModal
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <span/>;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps}/>;
};

export default connect(
  state => state.modal
)(ModalRoot);
