import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "../../_metronic/layout/core";
import { ListWrapper } from "./PortasList";
import { ListWrapper as ListWrapperDue } from "./PortasListDue";
import { ListWrapper as ListWrapperClosed } from "./PortasListClosed";
import { DetailsDocumentWrapper } from "./PortasEdit";
import { ListWrapper as MyAssigned } from "./PortasListAssigned";
import { useAuth } from "../../providers";
// import { UsersNewWrapper } from "./NewUser"

const Wrapper = () => {

  const { hasPermission } = useAuth();
  return (
    <Routes>
      <Route element={<Outlet />}>
        {hasPermission("4", "read") && <Route
          path="/view"
          element={
            <>
              <PageTitle>
                Solicitudes Pendientes
              </PageTitle>
              <ListWrapper />
            </>
          }
        />}
        {hasPermission("2", "read") && <Route
          path="/due"
          element={
            <>
              <PageTitle>
                Solicitudes Vencidas
              </PageTitle>
              <ListWrapperDue />
            </>
          }
        />}
        {hasPermission("3", "read") && <Route
          path="/closed"
          element={
            <>
              <PageTitle>
                Solicitudes Cerradas
              </PageTitle>
              <ListWrapperClosed />
            </>
          }
        />}

        <Route
          path="/details/:id"
          element={
            <>
              <PageTitle>
                Solicitudes / Detalle
              </PageTitle>
              <DetailsDocumentWrapper />
            </>
          }
        />
        {hasPermission("1", "read") && <Route
          path="/assigned/"
          element={
            <>
              <PageTitle>
                Mis Asignaciones
              </PageTitle>
              <MyAssigned />
            </>
          }
        />}
      </Route>

      <Route index element={<Navigate to="/portas-out/view" />} />
    </Routes>
  );
};

export default Wrapper;
