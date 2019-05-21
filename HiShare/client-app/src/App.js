import React from "react";
import Main from "./pages/Main";
import Article from "./pages/Article";
import PublishArticle from "./pages/PublishArticle";
import NotFound from "./pages/NotFound";
import { Customizer } from "office-ui-fabric-react";
import { FluentCustomizations } from "@uifabric/fluent-theme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Customizer {...FluentCustomizations}>
        <Router>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/articles/new" component={PublishArticle}/>
                <Route path="/articles/:token" component={Article} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    </Customizer>
  )
}
export default App;
