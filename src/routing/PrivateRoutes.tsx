import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { getCSSVariableValue } from "../_metronic/assets/ts/_utils";
import { WithChildren } from "../_metronic/helpers";

const PrivateRoutes = () => {
  // const WizardsPage = lazy(() => import("../modules/wizards/WizardsPage"));
  // const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));
  // const WidgetsPage = lazy(() => import("../modules/widgets/WidgetsPage"));
  // const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
  // const UsersPage = lazy(() => import("../pages/users/UsersPage"));
  // const AdminsPage = lazy(() => import("../pages/admins/AdminsPage"));
  const PortasPage = lazy(() => import("../pages/portas/PortasPage"));
  const TopologiaPage = lazy(() => import("../pages/topologias/TopologiaPage"));
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="auth/*" element={<Navigate to="/portas-out/view" />} />
        {/* <Route path="dashboard" element={<DashboardWrapper />} /> */}

        <Route
          path="/topologias/*"
          element={
            <SuspensedView>
              <TopologiaPage />
            </SuspensedView>
          }
        /> 
        <Route
          path="/portas-out/*"
          element={
            <SuspensedView>
              <PortasPage />
            </SuspensedView>
          }
        />
        <Route path="*" element={<Navigate to="/portas-out/view" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 2,
    shadowBlur: 5,
  });

  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
