import logo from "./logo.svg";
import "./App.css";
import Header from "./components/layout/Header";
import { Fragment } from "react";
import FileUpload from "./components/ui/FileUpload";
import Search from "./components/ui/Search";

function App() {
  return (
    <Fragment>
      <Header />
      <FileUpload />
      <hr />
      <Search />
    </Fragment>
  );
}

export default App;
