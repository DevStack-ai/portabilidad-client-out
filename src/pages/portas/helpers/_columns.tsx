// @ts-nocheck
import { Column } from "react-table";
import moment from "moment-timezone";
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

moment.tz.setDefault("UCT");

function getColumns({ setDocument, takeCase, currentUser }) {
  const Columns: ReadonlyArray<Column<Object>> = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "-",
      accessor: "due_date",
      Cell: ({ value, row }) => {
        let color = "green";
        const today = moment().add(-5, 'hour')
        const duration = moment(value).diff(today, 'minutes')

        const diff = duration / 60
        if (diff <= 1) {
          color = "red";
        }
        if (diff <= 2 && diff > 1) {
          color = "orange";
        }
        if (diff <= 3 && diff > 2) {
          color = "yellow"
        }

        return <div style={{ backgroundColor: color, height: "100%", width: "10px", color: color }} >.</div>
      }
    },
    {
      Header: "Fecha y Hora de Vencimiento",
      accessor: "_due_date",
      Cell: ({ row }) => {
        return moment(row.original.due_date).format("DD/MM/YYYY HH:mm")
      }
    },
    {
      Header: "Telefono",
      accessor: "phone",
    },
    {
      Header: "ID de transacción",
      accessor: "poa_transaction_id"
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
      Header: "Agente",
      accessor: "agent",

      Cell: ({ row }) => {
        return <>{row.original?.agent?.username}</>
      }
    },
    {
      Header: "FECHA SOLICITUD ASEP",
      accessor: "poa_timestamp",
      Cell: ({ value }) => {
        return moment(value).format("DD/MM/YYYY HH:mm")
      }
    },
    {
      Header: "Acciones",
      id: "actions",
      Cell: ({ row }) => {
        return (
          <div className="px-2">
            <Dropdown as={ButtonGroup}>

              <Button variant="secondary">
                <Link
                  to={`/portas-out/details/${row.original.id}`}
                  style={{ color: "black" }}
                >
                  Detalle
                </Link>
              </Button>
              {(row.original.agent?.id === currentUser?.id || !row.original.agent?.id)
                && <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />}

              <Dropdown.Menu>
                {!row.original.agent?.id && <Dropdown.Item onClick={() => takeCase(row.original.id)}>Tomar caso</Dropdown.Item>}
                {row.original.agent?.id === currentUser.id && <Dropdown.Item onClick={() => setDocument(row.original)}>Cerrar caso</Dropdown.Item>}
              </Dropdown.Menu>
            </Dropdown>

          </div>
        );
      },
    },
  ];
  return Columns;
}
function getAssigned({ setDocument }) {
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
      Header: "ID de transacción",
      accessor: "poa_transaction_id"
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
      Header: "FECHA SOLICITUD ASEP",
      accessor: "poa_timestamp",
      Cell: ({ value }) => {
        return moment(value).format("DD/MM/YYYY HH:mm");
      }
    },
    {
      Header: "Acciones",
      id: "actions",
      Cell: ({ row }) => {
        return (
          <div className="px-2">
            <Dropdown as={ButtonGroup}>

              <Button variant="secondary">
                <Link
                  to={`/portas-out/details/${row.original.id}`}
                  style={{ color: "black" }}
                >
                  Detalle
                </Link>
              </Button>
              <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

              <Dropdown.Menu>
                {!row.original.topologia && <Dropdown.Item onClick={() => setDocument(row.original)}>Cerrar caso</Dropdown.Item>}
              </Dropdown.Menu>
            </Dropdown>

          </div>
        );
      },
    },
  ];
  return Columns;
}
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
    Header: "ID de transacción",
    accessor: "poa_transaction_id"
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
    Header: "Agente",
    accessor: "agent",

    Cell: ({ row }) => {
      return <>{row.original?.agent?.username}</>
    }
  },
  {
    Header: "Tipologia",
    accessor: "topologia",

    Cell: ({ row }) => {
      return <>{row.original?.topologia?.description}</>
    }
  },
  {
    Header: "FECHA SOLICITUD ASEP",
    accessor: "poa_timestamp",
    Cell: ({ value }) => {
      return moment(value).format("DD/MM/YYYY HH:mm");
    }
  },
  {
    Header: "Fecha y Hora de Cierre",
    accessor: "closed_at",
    Cell: ({ value }) => {
      return value ? moment(value).add(-5, "hour").format("DD/MM/YYYY HH:mm") : null;
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
export { getColumns, ClosedColumns, getAssigned };
