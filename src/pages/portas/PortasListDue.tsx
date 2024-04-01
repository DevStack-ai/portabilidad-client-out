import { BasicTable } from "../../_metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "../../_metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { Columns } from "./helpers/_columns";
import { Search } from "../../_metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/portasoutdue/actions";

const ListWrapper = () => {
  const portasoutdue: BasicTableState = useSelector((state: ReduxState) => state.portasoutdue);
  const { dataList, helpers } = useBasicTable("/porta-request-out/due", portasoutdue, actions);

  useEffect(() => {
    if (portasoutdue.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <BasicTable
      {...helpers}
      columnsList={Columns}
      dataList={dataList}
    >
      <Search
        placeholder="Buscar por teléfono"
        onChange={(term: string) => {
          helpers.setFilters({
            "phone": term,
          });
        }}
      />
    </BasicTable>
  );
};

export { ListWrapper };
