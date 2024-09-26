import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { SignUp } from "./pages/SignUp";
import { Header } from "./components/Header";
import FooterComponent from "./components/FooterComponent";
import PrivateRouter from "./components/PrivateRouter";
import { DashProfile } from "./components/DashProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PrivateRouter />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<DashProfile />} />
        </Route>

        <Route path="/projects" element={<Projects />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}
