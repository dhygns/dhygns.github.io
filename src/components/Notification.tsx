import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassStart } from "@fortawesome/free-solid-svg-icons";

export const Notification = () => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="modal-notification"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100" id="modal-notification">
            <FontAwesomeIcon icon={faHourglassStart} className="mx-2"/> Working In Progress
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">WIP for this website, but you can keep going : )</p>
          <p className="text-end">
            <Button variant="primary" onClick={() => setShow(false)}>
              Close
            </Button>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};
