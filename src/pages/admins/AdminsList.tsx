import { BasicTable } from "../../_metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "../../_metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { usersColumns } from "./helpers/_columns";
import { Search } from "../../_metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/admins/actions";

const UsersListWrapper = () => {
  const admins: BasicTableState = useSelector((state: ReduxState) => state.admins);
  const { dataList, helpers } = useBasicTable("/admins", admins, actions);

  useEffect(() => {
    if (admins.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <BasicTable
      {...helpers}
      headerAddButton
      columnsList={usersColumns}
      dataList={dataList}
    >
      <Search
        onChange={(term: string) => {
          helpers.setFilters({
            "username": term,
          });
        }}
      />
    </BasicTable>
  );
};

export { UsersListWrapper };
