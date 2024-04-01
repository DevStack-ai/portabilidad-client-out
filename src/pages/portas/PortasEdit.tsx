import React, { useCallback, useEffect, useState } from "react";

import { ListLoading } from "../../_metronic/helpers/components/table/components/loading/ListLoading";

import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "./helpers/_requests";
import toast from "react-hot-toast";
import { PortaRequest } from "../../definitions";
import moment from "moment";

const DetailsDocumentWrapper = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [isLoading, setIslOading] = useState(true);
  const [document, setDocument] = useState<PortaRequest | null>(null);
  const id = params.id;



  const fetchDocument = useCallback(async () => {
    setIslOading(true);
    const query = await getUser(id);
    setDocument(query.data);
    setIslOading(false);
  }, [id]);

  useEffect(() => {
    fetchDocument();
  }, []);


  if (isLoading) {
    return <ListLoading />;
  }
  if (!document) {
    return <div>Solicitud no encontrada</div>
  }
  return (

    <div className="px-10 pt-lg-10">

      <div className="row mb-6 ms-0 px-0">
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          USUARIO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.puser?.username}
        </div>
    
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          FECHA DE SOLICITUD
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {moment(document.created_at).format("DD/MM/YYYY hh:mm A")}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          NOMBRE
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.name}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          EMAIL
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.email}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          TELÉFONO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.phone}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          TELÉFONO DE CONTACTO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.contact_phone}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          TIPO DE DOCUMENTO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.document_type === 1 ? "Cedula" :
            document.document_type === 2 ? "Pasaporte" :
              "RUC"}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          DOCUMENTO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.document_type === 1 ? `${document.c_provincia || document.c_letra}-${document.c_asiento}-${document.c_folio}` :
            document.document_type === 2 ? document.passport :
              document.ruc}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          DIRECCIÓN
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.address}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          PROVINCIA
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.provincia}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          DISTRITO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.distrito}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          CORREGIMIENTO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.corregimiento}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          BARRIO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.barrio}
        </div>
     
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          TIPO DE VIVIENDA
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.home_type === "1" ? "Casa" : "Apartamento"}
        </div>
      
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          NÚMERO DE CASA
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.home_number}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          NIP
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.nip}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          ORIGEN
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.porigin?.name}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          SIMCARD
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.simcard}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          TELÉFONO PORTADO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.sgo_ported_phone}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          RPA ESTATUS
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.rpa_status}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          RPA MENSAJE
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.rpa_message}
        </div>
      
      </div>

      <div className="text-right w-100 pt-15 d-flex justify-content-end">
        <button
          type="reset"
          onClick={() => navigate("..")}
          className="btn btn-light me-3"
          data-kt-users-modal-action="cancel"
        >
          Regresar
        </button>

      </div>
    </div>

  );
};
export { DetailsDocumentWrapper };
