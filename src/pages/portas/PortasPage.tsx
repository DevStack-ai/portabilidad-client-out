import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "../../_metronic/layout/core";
import { ListWrapper } from "./PortasList";
import { DetailsDocumentWrapper } from "./PortasEdit";
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
                Solicitudes
              </PageTitle>
              <ListWrapper />
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
      </Route>

      <Route index element={<Navigate to="/portas-out/view" />} />
    </Routes>
  );
};

export default Wrapper;
