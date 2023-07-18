import { Route, Routes } from "react-router-dom";
import { HOME } from "./path";
import { Home } from "../../components/pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path={HOME} element={<Home />} />
    </Routes>
  );
}

export default App;
