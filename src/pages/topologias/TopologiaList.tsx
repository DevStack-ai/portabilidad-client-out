import { BasicTable } from "../../_metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "../../_metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { Columns } from "./helpers/_columns";
import { Search } from "../../_metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/topologias/actions";

const ListWrapper = () => {
  const topologias: BasicTableState = useSelector((state: ReduxState) => state.topologias);
  const { dataList, helpers } = useBasicTable("/topologias", topologias, actions);

  useEffect(() => {
    if (topologias.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <BasicTable
      {...helpers}
      headerAddButton
      columnsList={Columns}
      dataList={dataList}
    >
      <Search
        placeholder="Buscar"
        onChange={(term: string) => {
          helpers.setFilters({
            "description": term,
          });
        }}
      />
    </BasicTable>
  );
};

export { ListWrapper };
