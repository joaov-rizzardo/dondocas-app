import { BrowserRouter as Router } from "react-router-dom";
import Content from "./components/Content/Content";
import Menu from "./components/Menu/Menu";
import './App.scss'

import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Menu />
        <Content />
      </Router>
    </AuthProvider>

  )
}
