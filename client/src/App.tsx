import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./app/routers/routes";

import theme from "./app/shared/theme/theme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <RoutesComponent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
