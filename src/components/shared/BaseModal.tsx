import React from "react";
import Modal from "react-bootstrap/Modal";

const BaseModal: React.FC<{
  show: boolean;
  onHide: () => void;
  text: string;
}> = ({ show, onHide, text }) => {
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

export default BaseModal;
