import React, { useMemo, useState } from "react";
import Modal from 'react-bootstrap/Modal';


import { PortaRequestOut, Topologia } from "../../definitions";


interface TopologiasModalProps {
  show: boolean;
  topologias: Array<Topologia>;
  document: PortaRequestOut | null;
  isLoading: boolean;
  onSave: (topologia_id: number) => Promise<void>;
}

export default ({ show, topologias, document, onSave }: TopologiasModalProps) => {


  const topologiasSelect = useMemo(() => topologias, []);
  const [value, setValue] = useState(document?.topologia_id || 0);
  const [showModal, setShowModal] = useState(show ?? true);
  const [isLoading, setIsLoading] = useState(false);

  async function submit() {
    setIsLoading(true)
    await onSave(Number(value));
    setShowModal(false)
    setIsLoading(false)

  }

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cerrar Caso {document?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            Seleccionar tipologia
          </label>
          <select className="form-select form-select-solid" onChange={(ev) => setValue(Number(ev.target.value))} >
            <option selected>- Seleccionar tipologia -</option>
            {topologiasSelect.map((topologia: any) => (
              <option value={topologia.id}>{topologia.description}</option>
            ))}
          </select>

        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
