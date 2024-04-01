import { ListToolbar } from "./ListToolbar";
import { AddButton } from "../../AddButton";


const ListHeader = ({ children, headerAddButton }: any) => {
  return (
    <div className="card-header border-0 pt-6">
      {/* begin::Card toolbar */}
      <div>
        {children}
      </div>
      <div className="card-toolbar">
        <ListToolbar />
        {headerAddButton && <AddButton />}
      </div>
    </div>
  );
};

export { ListHeader };
