import React, { memo } from "react";
import Modal from "react-bootstrap/Modal";
import { BaseModalProps } from "../../types/modal";

const BaseModal: React.FC<BaseModalProps> = ({ show, onHide, text }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton />
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <button onClick={onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(BaseModal);
