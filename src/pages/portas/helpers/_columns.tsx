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
    Header: "Tipo de servicio",
    accessor: "poa_serv_type",
    Cell: ({ row }) => {
      return <>{row.original?.poa_serv_type === "prepaid" ? "Prepago" : "Postpago"}</>
    }
  },
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Documento",
    accessor: "document",
    Cell: ({ row }) => {
      return <>{row.original?.document}</>
    }
  },
  {
    Header: "RAZÓN",
    accessor: "reason",

    Cell: ({ row }) => {
      return <>{row.original?.reason?.description}</>
    }
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
const ClosedColumns: ReadonlyArray<Column<Object>> = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Telefono",
    accessor: "phone",
  },
  {
    Header: "Tipo de servicio",
    accessor: "poa_serv_type",
    Cell: ({ row }) => {
      return <>{row.original?.poa_serv_type === "prepaid" ? "Prepago" : "Postpago"}</>
    }
  },
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Documento",
    accessor: "document",
    Cell: ({ row }) => {
      return <>{row.original?.document}</>
    }
  },
  {
    Header: "RAZÓN",
    accessor: "reason",

    Cell: ({ row }) => {
      return <>{row.original?.reason?.description}</>
    }
  },
  {
    Header: "Tipologia",
    accessor: "topologia",

    Cell: ({ row }) => {
      return <>{row.original?.tipologia?.description}</>
    }
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
export { Columns, ClosedColumns };
