import { BasicTable } from "../../_metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "../../_metronic/helpers/components/table/useBasicTable";
import { useCallback, useEffect, useState } from "react";
import { ClosedColumns } from "./helpers/_columns";
import { Search } from "../../_metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/portasoutclosed/actions";
import { Select } from "../../_metronic/helpers/components/table/components/header/ListSelectComponent";
import { Topologia } from "../../definitions";
import { getTopologias } from "./helpers/_requests";

const ListWrapper = () => {
  const portasoutclosed: BasicTableState = useSelector((state: ReduxState) => state.portasoutclosed);
  const { dataList, helpers } = useBasicTable("/porta-request-out/closed", { ...portasoutclosed, filters: {} }, actions);

  const [topologias, setTopologias] = useState<Topologia[]>([])


  const fetchDocument = useCallback(async () => {
    const topologiasQuery = await getTopologias()
    setTopologias(topologiasQuery.data)
  }, []);

  useEffect(() => {
    fetchDocument();
  }, []);


  useEffect(() => {
    if (portasoutclosed.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <BasicTable
      {...helpers}
      columnsList={ClosedColumns}
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
          placeholder="Selecciona una topología"
          onChange={(term: string) => helpers.setFilters({ topologia_id: term })}
          options={topologias.map((topologia) => ({ value: String(topologia.id), label: topologia.description }))}
        />
        <Select
          placeholder="Selecciona un tipo de servicio"
          onChange={(term: string) => helpers.setFilters({ poa_serv_type: term })}
          options={[{ value: "prepaid", label: "Prepago" }, { value: "postpaid", label: "Postpago" }]}
        />
        <Select
          placeholder="Sleccione un segmento"
          onChange={(term: string) => helpers.setFilters({ cust_type: term })}
          options={[
            { value: "postpaid-A,N,V,G,L", label: "B2B FULL" },
            { value: "postpaid-R", label: "B2C" },
            { value: "postpaid-M", label: "B2B SOHO" },
            { value: "postpaid-", label: "B2C" },
            { value: "prepaid-", label: "Prepago" }
          ]}
        />
      </div>
    </BasicTable>
  );
};

export { ListWrapper };
