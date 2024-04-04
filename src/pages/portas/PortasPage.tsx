import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "../../_metronic/layout/core";
import { ListWrapper } from "./PortasList";
import { ListWrapper as ListWrapperDue } from "./PortasListDue";
import { ListWrapper as ListWrapperClosed } from "./PortasListClosed";
import { DetailsDocumentWrapper } from "./PortasEdit";
import { ListWrapper as MyAssigned } from "./PortasListAssigned";
// import { UsersNewWrapper } from "./NewUser"

const Wrapper = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="/view"
          element={
            <>
              <PageTitle>
                Solicitudes Pendientes
              </PageTitle>
              <ListWrapper />
            </>
          }
        />
        <Route
          path="/due"
          element={
            <>
              <PageTitle>
                Solicitudes Vencidas
              </PageTitle>
              <ListWrapperDue />
            </>
          }
        />
        <Route
          path="/closed"
          element={
            <>
              <PageTitle>
                Solicitudes Cerradas
              </PageTitle>
              <ListWrapperClosed />
            </>
          }
        />

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
          <Route
          path="/assigned/"
          element={
            <>
              <PageTitle>
                Mis Asignaciones
              </PageTitle>
              <MyAssigned />
            </>
          }
        />
      </Route>

      <Route index element={<Navigate to="/portas-out/view" />} />
    </Routes>
  );
};

export default Wrapper;
