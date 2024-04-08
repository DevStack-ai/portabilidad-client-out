import React, { useState, useCallback } from "react";
import { BasicTable } from "../../_metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "../../_metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { getColumns } from "./helpers/_columns";
import { getTopologias } from "./helpers/_requests";
import { Search } from "../../_metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState, useAuth } from "../../providers";
import * as actions from "../../redux/reducers/portasoutdue/actions";
import TopologiaModal from "../../components/modal/TopologiaModal";
import { updateUser, takeCase } from "../portas/helpers/_requests";
import toast from "react-hot-toast";
import { PortaRequestOut, Topologia } from "../../definitions";
import { Select } from "../../_metronic/helpers/components/table/components/header/ListSelectComponent";

const ListWrapper = () => {
  const portasoutdue: BasicTableState = useSelector((state: ReduxState) => state.portasoutdue);
  const { dataList, helpers } = useBasicTable("/porta-request-out/due", portasoutdue, actions);

  const { currentUser } = useAuth()
  const [modalShow, setModalShow] = useState(false);
  const [topologias, setTopologias] = useState<Topologia[]>([])
  const [document, setDocument] = useState<null | PortaRequestOut>(null);

  const fetchDocument = useCallback(async () => {
    const topologiasQuery = await getTopologias()
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

    } catch (err: any) {
      console.log(err)
      const message = err.response.data.message || "Error al cerrar caso"
      toast.error(message)
      setDocument(null)
      setModalShow(false)
      helpers.fetchData();

    }

  }

  function closeCae(document: PortaRequestOut) {
    setDocument(document)
    setModalShow(true)

  }
  async function take(porta_id: number) {
    try {
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
    if (portasoutdue.isFirstTime) {
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
          <Select
            placeholder="Selecciona un tipo de servicio"
            onChange={(term: string) => helpers.setFilters({ poa_serv_type: term })}
            options={[{ value: "prepaid", label: "Prepago" }, { value: "postpaid", label: "Postpago" }]}
          />
        </div>
      </BasicTable>
    </>
  );
};

export { ListWrapper };
