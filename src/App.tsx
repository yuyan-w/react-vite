import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Sample } from "./components/Sample";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import DateView from "./components/DateView";
import ButtonLoadingDemo from "./components/LoadingButtonDemo";
import { TaskListPage } from "./components/table/TaskListPage";
import LayoutSample from "./components/layout/LayoutSample";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/sample" element={<Sample />} />
          <Route path="/loading" element={<ButtonLoadingDemo />} />
          <Route path="/date" element={<DateView />} />
          <Route path="/table" element={<TaskListPage />} />
          <Route path="/layout" element={<LayoutSample />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
