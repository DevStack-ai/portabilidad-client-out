import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "../../_metronic/layout/core";
import { ListWrapper } from "./TopologiaList";
import { EditDocumentWrappeer } from "./TopologiaEdit";
import { CreateDocumentWrapper } from "./TopologiaCreate"
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
                Tipologias
              </PageTitle>
              <ListWrapper />
            </>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <>
              <PageTitle>
                Tipologias / Editar
              </PageTitle>
              <EditDocumentWrappeer />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <PageTitle>
                Tipologias / Nueva
              </PageTitle>
              <CreateDocumentWrapper />
            </>
          }
        />


      </Route>

      <Route index element={<Navigate to="/topologias/view" />} />
    </Routes>
  );
};

export default Wrapper;
