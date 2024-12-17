import React, { useState, useCallback } from "react";
import { BasicTable } from "../../_metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "../../_metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { getAssigned } from "./helpers/_columns";
import { getTopologias } from "./helpers/_requests";
import { Search } from "../../_metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/assigned/actions";
import TopologiaModal from "../../components/modal/TopologiaModal";
import { updateUser } from "../portas/helpers/_requests";
import toast from "react-hot-toast";
import { PortaRequestOut, Topologia } from "../../definitions";
import { Select } from "../../_metronic/helpers/components/table/components/header/ListSelectComponent";

const ListWrapper = () => {
  const assigned: BasicTableState = useSelector((state: ReduxState) => state.assigned);
  const { dataList, helpers } = useBasicTable("/porta-request-out/assign", assigned, actions);

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

  useEffect(() => {
    if (assigned.isFirstTime) {
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
        columnsList={getAssigned({ setDocument: closeCae })}
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
