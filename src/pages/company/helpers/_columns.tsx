// @ts-nocheck
import { Column } from "react-table";
import { IndexColumn } from "../../helpers/IndexColumn";
import moment from "moment";
import { Link } from "react-router-dom";
const Columns = (state): ReadonlyArray<Column<Object>> => [
  {
    Header: "No",
    accessor: "adm_department_id",
    Cell: ({ row }) => IndexColumn(row.index, state),
  },
  {
    Header: "Nombre",
    accessor: "adm_company_name",
  },
  {
    Header: "NIT",
    accessor: "adm_company_nit",
  },
  {
    Header: "Dirección",
    accessor: "adm_company_address",
  },
  {
    Header: "Departamento",
    accessor: "adm_department_name",
  },

  {
    Header: "Municipio",
    accessor: "adm_municipality_name",
  },
  {
    Header: "Nombre representante legal",
    accessor: "adm_company_legal_representative_name",
  },
  {
    Header: "Moneda local",
    accessor: "adm_company_currency",
  },
  {
    Header: "Apertura fiscal",
    accessor: "init_operations_date",
    Cell: ({ row }) => {
      return (
        <div>
          {row.original.adm_company_init_operations_date
            ? moment(row.original.adm_company_init_operations_date, "YYYY-MM-DD").format(
              "DD/MM/YYYY",
            )
            : ""}
        </div>
      );
    },
  },
  {
    Header: "Tipo de empresa",
    accessor: "adm_company_type_name",
  },
  {
    Header: "Número de teléfono",
    accessor: "adm_company_phone",
  },
  {
    Header: "Régimen ISR",
    accessor: "adm_isr_regime_name",
  },

  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      return (
        <div className="px-2">
          <Link
            to={`/company/edit/${row.original.adm_company_id}`}
            className="btn btn-secondary btn-sm me-2 mb-2 hover-elevate-down"
          >
            Editar
          </Link>
        </div>
      );
    },
  },
];

export { Columns };
