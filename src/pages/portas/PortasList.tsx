import React, { useState, useCallback } from "react";
import { BasicTable } from "../../_metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "../../_metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { getColumns } from "./helpers/_columns";
import { getReasons, getTopologias } from "./helpers/_requests";
import { Search } from "../../_metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState, useAuth } from "../../providers";
import * as actions from "../../redux/reducers/portasout/actions";
import TopologiaModal from "../../components/modal/TopologiaModal";
import { updateUser, takeCase } from "../portas/helpers/_requests";
import toast from "react-hot-toast";
import { PortaRequestOut, Reason, Topologia } from "../../definitions";
import { Select } from "../../_metronic/helpers/components/table/components/header/ListSelectComponent";

const ListWrapper = () => {
  const portasout: BasicTableState = useSelector((state: ReduxState) => state.portasout);
  const { dataList, helpers } = useBasicTable("/porta-request-out", portasout, actions);

  const { currentUser } = useAuth()
  const [modalShow, setModalShow] = useState(false);
  const [topologias, setTopologias] = useState<Topologia[]>([])
  const [reasons, setReasons] = useState<Reason[]>([])

  const [document, setDocument] = useState<null | PortaRequestOut>(null);

  const fetchDocument = useCallback(async () => {
    const topologiasQuery = await getTopologias()
    const reasonsQuery = await getReasons()

    setReasons(reasonsQuery.data)
    setTopologias(topologiasQuery.data)
  }, []);

  useEffect(() => {
    fetchDocument();
  }, []);

  async function updateDocument(value: number) {
    try {
      if (!document) return

      setModalShow(false)
      await updateUser(document.id, { topologia_id: value });
      helpers.fetchData();
      setDocument(null)
      toast.success("Actualizado exitosamente")

    } catch (err: any) {
      console.log(err)
      const message = err.response.data.message || "Error al cerrar caso"
      toast.error(message)
      setDocument(null)
      setModalShow(false)

    }

  }

  function closeCae(document: PortaRequestOut) {
    setDocument(document)
    setModalShow(true)

  }

  async function take(porta_id: number) {
    try {
      console.log(porta_id)
      await takeCase(porta_id)
      toast.success("Asignado exitosamente")
      helpers.fetchData();

    } catch (err: any) {
      console.log(err)
      const message = err.response.data.message || "Error al tomar caso"
      toast.error(message)
      helpers.fetchData();

    }
  }

  useEffect(() => {
    if (portasout.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <>
      {document?.id && <TopologiaModal
        show={modalShow}
        topologias={topologias}
        document={document}
        isLoading={helpers.isLoading}
        onSave={updateDocument}
      />}
      <div className="row flex-row-reverse px-5">
        <div className="col-1">
          <div className="card text-center fw-bold h4 center-card" style={{ height: "50px", backgroundColor: "red", color: "white" }}>
            1 horas
            <br />
            {helpers?.response?.extradata?.danger}
          </div>
        </div>
        <div className="col-1">
          <div className="card text-center fw-bold h4 center-card" style={{ height: "50px", backgroundColor: "orange" }}>
            2 horas
            <br />

            {helpers?.response?.extradata?.warning}

          </div>
        </div>
        <div className="col-1">
          <div className="card text-center fw-bold h4 center-card" style={{ height: "50px", backgroundColor: "yellow" }}>
            3 horas
            <br />

            {helpers?.response?.extradata?.alert}

          </div>
        </div>
        <div className="col-1">
          <div className="card text-center fw-bold h4 center-card" style={{ height: "50px", backgroundColor: "green", color: "white" }}>
            4 horas
            <br />

            {helpers?.response?.extradata?.safe}

          </div>
        </div>
      </div>
      <BasicTable
        {...helpers}
        columnsList={getColumns({ setDocument: closeCae, takeCase: take, currentUser })}
        dataList={dataList}
      >
        <div className="d-flex">
          <Search
            placeholder="Buscar por teléfono"
            onChange={(term: string) => helpers.setFilters({ phone: term })}
          />

          <Search
            placeholder="Buscar por ID de transacción"
            onChange={(term: string) => helpers.setFilters({ id: term })}
          />
          <Select
            placeholder="Selecciona razón"
            onChange={(term: string) => helpers.setFilters({ reason_id: term })}
            options={reasons.map((reason) => ({ value: String(reason.status), label: reason.description }))}
          />
          <Select
            placeholder="Selecciona tipo de servicio"
            onChange={(term: string) => helpers.setFilters({ poa_serv_type: term })}
            options={[{ value: "prepaid", label: "Prepago" }, { value: "postpaid", label: "Postpago" }]}
          />
          <Select
            placeholder="Seleccione hora limite"
            onChange={(term: string) => helpers.setFilters({ soon_due_date: term })}
            options={[
              { value: "1", label: "< 1 hora" },
              { value: "2", label: "< 2 horas" },
              { value: "3", label: "< 3 horas" },
              { value: "4", label: "< 4 horas" }
            ]}
          />
        </div>
      </BasicTable>
    </>
  );
};

export { ListWrapper };
