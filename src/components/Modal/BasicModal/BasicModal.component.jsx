import React from "react";
import "./BasicModa.styles.scss";
import { Modal, Icon } from "semantic-ui-react";

const BasicModal = ({ show, setShow, title, children }) => {
  const onClose = () => {
    setShow(false);
  };

  return (
    <Modal open={show} onClose={onClose} className="basic-modal" size="tiny">
      <Modal.Header>
        <h3>{title}</h3>
        <Icon name="close" onClick={onClose} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};

export default BasicModal;
