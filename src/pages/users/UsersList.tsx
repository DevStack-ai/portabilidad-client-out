import { BasicTable } from "../../_metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "../../_metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { usersColumns } from "./helpers/_columns";
import { Search } from "../../_metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/users/actions";

const UsersListWrapper = () => {
  const users: BasicTableState = useSelector((state: ReduxState) => state.users);
  const { dataList, helpers } = useBasicTable("/users", users, actions);

  useEffect(() => {
    if (users.isFirstTime) {
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
            "username": term
          });
        }}
      />
    </BasicTable>
  );
};

export { UsersListWrapper };
