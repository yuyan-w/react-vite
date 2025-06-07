import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";

import TreeViewPage from "./components/pages/TreeView";
import FormView from "./components/pages/FormView";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/tree" element={<TreeViewPage />} />
          <Route path="/form" element={<FormView />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
