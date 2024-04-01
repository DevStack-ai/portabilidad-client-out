import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageTitle } from "../../_metronic/layout/core";
import { MunicipalityWrapper } from "./CompanyList";
import { NewDocumentWrappeer } from "./CompanyNew";
import { EditDocumentWrappeer } from "./CompanyEdit";
// import { UsersNewWrapper } from "./NewUser"

const DepartmentPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="/view"
          element={
            <>
              <PageTitle>
                Empresas
              </PageTitle>
              <MunicipalityWrapper />
            </>
          }
        />

        <Route
          path="/create"
          element={
            <>
              <PageTitle>
                Empresas / Agregar
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
                Empresas / Editar
              </PageTitle>
              <EditDocumentWrappeer />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/company/view" />} />
    </Routes>
  );
};

export default DepartmentPage;
