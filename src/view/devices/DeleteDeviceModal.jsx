import { Fragment, useState } from "react";
import Modal from 'react-modal';
import { deleteDevice } from "../../api/FetchDevices";
import { Trash } from "phosphor-react";

const DeleteDeviceModal = ({ token, id, addressId, ...props }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const DeleteDevice = async () => {
    await deleteDevice(token, id, addressId).then(()=>{
      props.onDelete(id)
    })
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      <button className="btn-address-delete" onClick={openModal}>
        <Trash size={25} weight="fill" />
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete device Modal"
        width = "200"
        height= "200"
      >
        <h2>Confirmação de exclusão</h2>
        <hr/>
        <p>Deseja realmente excluir este equipamento?</p>
        <div className="btns-device-modal">
          <button className="btn-device-modal-cancelar" onClick={closeModal}>Cancelar</button>
          <button className="btn-device-modal-delete" onClick={DeleteDevice}>Excluir</button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default DeleteDeviceModal;