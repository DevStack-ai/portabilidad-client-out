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
    Header: "Descripcion",
    accessor: "description",

  },
  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      return (
        <div className="px-2">
          <Link
            to={`/topologias/edit/${row.original.id}`}
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
