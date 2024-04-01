import React, { useCallback, useEffect, useState } from "react";

import { ListLoading } from "../../_metronic/helpers/components/table/components/loading/ListLoading";

import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "./helpers/_requests";
import { PortaRequestOut } from "../../definitions";
import moment from "moment";

const DetailsDocumentWrapper = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [isLoading, setIslOading] = useState(true);
  const [document, setDocument] = useState<PortaRequestOut | null>(null);
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
          TELÉFONO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.phone}
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
          DOCUMENTO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.document}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          RAZON
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.reason_id}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          CURR STATE
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.poa_curr_state}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          DATE
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.poa_date}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          LIB ACCT NO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.poa_lib_acct_no}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          LIB OS BAL
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.poa_lib_os_bal}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          SERV TYPE
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.poa_serv_type}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          SERVICE NO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.poa_service_no}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          TRANSACTION ID
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.poa_transaction_id}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          GINA ID CASO
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.gina_id_caso}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          ADD DATE
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.poa_add_date}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          CUST TYPE
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.poa_cust_type}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          TIMESTAMP
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.poa_timestamp}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          TOPOLOGIA ID
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.topologia_id}
        </div>
        <label className="col-sm-12 col-lg-2 col-form-label fw-bold fs-6">
          MESSAGE PXS
        </label>
        <div className="col-lg-4 col-form-label fw-bold fs-6 ">
          {document.poa_message_pxs}
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
