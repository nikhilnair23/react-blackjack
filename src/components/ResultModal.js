import {Button, Modal} from "react-bootstrap";
import {modalStyle} from "../constants";

export const ResultModal = ({show, handleClose, message}) =>
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
            style={modalStyle}
        >
            <Modal.Title>{message}</Modal.Title>
        </Modal.Header>
        <Modal.Footer
            style={modalStyle}
        >
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
