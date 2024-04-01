import React from 'react'
import { createRoot } from "react-dom/client";
// Axios
import axios from "axios";
import { Chart, registerables } from "chart.js";
// Apps
import "./_metronic/assets/fonticon/fonticon.css";
import "./_metronic/assets/keenicons/duotone/style.css";
import "./_metronic/assets/keenicons/outline/style.css";
import "./_metronic/assets/keenicons/solid/style.css";
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 */

import "./_metronic/assets/sass/style.scss";
import "./_metronic/assets/sass/plugins.scss";
import "./global.css";

import { AppRoutes } from "./routing/AppRoutes";
import { AuthProvider, setupAxios } from "./providers";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
setupAxios(axios);
Chart.register(...registerables);

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </PersistGate>
      </Provider>
  );
}
