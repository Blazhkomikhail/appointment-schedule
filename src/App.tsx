import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/";
import ComingSoon from "./pages/ComingSoon";
import Profile from "./pages/Profile";
import PrivateRoute from "./helpers/routing/PrivateRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./redux";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003367",
    },
  },
  typography: {
    allVariants: {
      color: "#003367",
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<ComingSoon />} />
            </Route>
            <Route path="/my-profile" element={<PrivateRoute />}>
              <Route path="/my-profile" element={<Profile />} />
            </Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
