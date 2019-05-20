import React from "react";
import Main from "./pages/Main";
import PublishArticle from "./pages/PublishArticle";
import { Customizer } from "office-ui-fabric-react";
import { FluentCustomizations } from "@uifabric/fluent-theme";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Customizer {...FluentCustomizations}>
        <Router>
            <Route path="/" exact component={Main} />
            <Route path="/articles/new" component={PublishArticle}/>
        </Router>
    </Customizer>
  )
}
export default App;
