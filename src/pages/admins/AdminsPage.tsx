import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "../../_metronic/layout/core";
import { UsersListWrapper } from "./AdminsList";
import { NewDocumentWrappeer } from "./AdminsNew";
import { EditDocumentWrappeer } from "./AdminsEdit";
// import { UsersNewWrapper } from "./NewUser"

const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="/view"
          element={
            <>
              <PageTitle>
                Administradores
              </PageTitle>
              <UsersListWrapper />
            </>
          }
        />
        <Route
          path="/create"
          element={
            <>
              <PageTitle>
                Administradores / Agregar
              </PageTitle>
              <NewDocumentWrappeer />
            </>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <>
              <PageTitle>
                Administradores / Editar
              </PageTitle>
              <EditDocumentWrappeer />
            </>
          }
        />
      </Route>

      <Route index element={<Navigate to="/admins/view" />} />
    </Routes>
  );
};

export default UsersPage;
