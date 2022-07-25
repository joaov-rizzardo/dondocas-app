import { BrowserRouter as Router } from "react-router-dom";
import Content from "./components/Content/Content";
import Menu from "./components/Menu/Menu";
import './App.scss'

export default function App() {
  return (
    <Router>
      <Menu />
      <Content />
    </Router>
  )
}
