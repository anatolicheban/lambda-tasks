import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Me from "./pages/Me";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="me" element={<Me />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
