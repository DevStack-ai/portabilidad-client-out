import { BasicTable } from "../../_metronic/helpers/components/table/BasicTable";
import { useBasicTable } from "../../_metronic/helpers/components/table/useBasicTable";
import { useEffect } from "react";
import { Columns } from "./helpers/_columns";
import { Search } from "../../_metronic/helpers/components/table/components/header/ListSearchComponent";
import { useSelector } from "react-redux";
import { BasicTableState, ReduxState } from "../../providers";
import * as actions from "../../redux/reducers/company/actions";

const MunicipalityWrapper = () => {
  const company: BasicTableState = useSelector((state: ReduxState) => state.company);
  const { dataList, helpers } = useBasicTable("/company", company, actions);

  useEffect(() => {
    if (company.isFirstTime) {
      helpers.fetchData();
    }
  }, []);
  return (
    <BasicTable
      {...helpers}
      headerAddButton
      columnsList={Columns(company)}
      dataList={dataList}
    >
      <Search
        onChange={(term: string) => {
          if (term) {
            helpers.setFilters({
              "adm_company.name": term,
              "adm_company.nit": term,
              "adm_company.legal_representative_name": term,
              "adm_company.phone": term,
              "adm_department.name": term,
              "adm_municipality.name": term,
              "adm_company_type.name": term,
              "adm_isr_regime.name": term,
            });
          }else{
            helpers.setFilters({});
          }
        }}
      />
    </BasicTable>
  );
};

export { MunicipalityWrapper };
