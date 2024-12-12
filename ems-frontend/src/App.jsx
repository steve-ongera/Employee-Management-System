import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ListEmployee from "./components/ListEmployee";
import Employee from "./components/Employee";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ListEmployee />}></Route>
        <Route path="/employees" element={<ListEmployee />}></Route>
        <Route path="/add-employee" element={<Employee />}></Route>
        <Route path="/edit-employee/:id" element={<Employee />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
