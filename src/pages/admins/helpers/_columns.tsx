// @ts-nocheck
import { Column } from "react-table";
import { UserInfoCell } from "./UserInfoCell";
import moment from "moment";
import { Link } from "react-router-dom";
const usersColumns: ReadonlyArray<Column<Object>> = [
  {
    Header: "No",
    id: "selection",
    Cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    Header: "Foto",
    id: "photo",
    Cell: ({ ...props }) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: "Usuario",
    accessor: "username",
  },


  {
    Header: "Acciones",
    id: "actions",
    Cell: ({ row }) => {
      return (
        <div className="px-2">
          <Link
            to={`/admins/edit/${row.original.id}`}
            className="btn btn-secondary btn-sm me-2 mb-2 hover-elevate-down"
          >
            Editar
          </Link>
        </div>
      );
    },
  },
];

export { usersColumns };
