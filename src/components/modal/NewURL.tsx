import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';


import { PortaRequestOut } from "../../definitions";
import toast from "react-hot-toast";
import { regeneratePorta } from "../../pages/portas/helpers/_requests";


interface ModalProps {
  show: boolean;
  document: PortaRequestOut | null;
  onSave: () => void
}

export default ({ show, document: _document }: ModalProps) => {


  const [showModal, setShowModal] = useState(show ?? true);
  const [url, setUrl] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  async function generate() {

    setLoading(true)
    toast.loading("Generando enlace")
    const query = await regeneratePorta(_document?.id)
    const token = query.data.token
    toast.dismiss()
    toast.success("Enlace generado")
    setUrl(`https://portabilidad.isoft-ste.com/out?token=${token}`)
    setLoading(false)

  }

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo enlace #{_document?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                generate()
              }}
              disabled={loading}
            >
              Generar nuevo enlace
            </button>
            {/* if url, input to copy it */}
            {url && <input
              type="text"
              onClick={(e) => {
                e.currentTarget.select();
                document.execCommand("copy");
                toast.success("Enlace copiado al portapapeles")
              }}
              className="form-control form-control-solid mt-5"
              value={url}
              readOnly />}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            disabled={loading}
            onClick={() => setShowModal(false)}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
