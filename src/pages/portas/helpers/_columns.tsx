// @ts-nocheck
import { Column } from "react-table";
import moment from "moment";
import { Link } from "react-router-dom";
const Columns: ReadonlyArray<Column<Object>> = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Telefono",
    accessor: "phone",
  },
  {
    Header: "Estado",
    accessor: "status",
  },
  {
    Header: "Fecha de solicitud",
    accessor: "created_at",
    Cell: ({ value }) => {
      return moment(value).format("DD/MM/YYYY HH:mm A");
    }
  },
  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      return (
        <div className="px-2">
          <Link
            to={`/portas-out/details/${row.original.id}`}
            className="btn btn-secondary btn-sm me-2 mb-2 hover-elevate-down"
          >
            Detalle
          </Link>
        </div>
      );
    },
  },
];

export { Columns };
