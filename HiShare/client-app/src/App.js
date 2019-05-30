import React from "react";
import Main from "./pages/Main";
import Article from "./pages/Article";
import PublishArticle from "./pages/PublishArticle";
import NewCollection from "./pages/NewCollection";
import EditCollection from "./pages/EditCollection";
import NotFound from "./pages/NotFound";
import Collection from "./pages/Collection";
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
                <Route path="/articles/:token" exact component={Article} />
                <Route path="/404" component={NotFound} />
                <Route path="/collections/new" component={NewCollection}/>
                <Route path="/collections/:accessToken" exact component={Collection} />
                <Route path="/collections/:accessToken/:controlToken/edit" component={EditCollection} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    </Customizer>
  )
}
export default App;
