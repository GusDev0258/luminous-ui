import { Fragment, useState } from "react";
import Modal from 'react-modal';
import { deleteAddressesOfUser } from "../../api/FetchAddress";
import { Trash } from "phosphor-react";

const DeleteAddressModal = ({ token, userId, addressId, ...props }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteAddress = async () => {
    await deleteAddressesOfUser(token, userId, addressId ).then(()=>{
      props.onDelete(addressId)
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
        contentLabel="Delete Address Modal"
      >
        <h2>Confirmação de exclusão</h2>
        <hr/>
        <p>Deseja realmente excluir este endereço?</p>
        <div className="btns-address-modal">
          <button className="btn-address-modal-cancelar" onClick={closeModal}>Cancelar</button>
          <button className="btn-address-modal-delete" onClick={deleteAddress}>Excluir</button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default DeleteAddressModal;
