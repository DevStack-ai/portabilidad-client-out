import { BasicTable } from "../../_metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "../../_metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { ClosedColumns } from "./helpers/_columns";
import { Search } from "../../_metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/portasoutclosed/actions";

const ListWrapper = () => {
  const portasoutclosed: BasicTableState = useSelector((state: ReduxState) => state.portasoutclosed);
  const { dataList, helpers } = useBasicTable("/porta-request-out/closed", portasoutclosed, actions);

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
      <div className="d-flex gap-3">
        <Search
          placeholder="Buscar por teléfono"
          onChange={(term: string) => {
            helpers.setFilters({
              "phone": term,
            });
          }}
        />

        <Search
          placeholder="Buscar por ID de transacción"
          onChange={(term: string) => {
            helpers.setFilters({
              "id": term,
            });
          }}
        />
      </div>
    </BasicTable>
  );
};

export { ListWrapper };
