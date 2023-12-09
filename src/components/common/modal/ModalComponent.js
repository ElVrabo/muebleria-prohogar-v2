
import Modal from "react-bootstrap/Modal";

const ModalComponent = ({functionShow,funtionOnHide,titleModal,bodyModal})=>{
 

    return (
        <Modal
        size="lg"
        show={functionShow}
        onHide={funtionOnHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {titleModal}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {bodyModal}
        </Modal.Body>
      </Modal>
    )
}
export default ModalComponent