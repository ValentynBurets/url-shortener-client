import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuthProvider from "./Components/AuthProvider/AuthProvider";

import LinkConfig from "./Assets/jsonData/LinkConfig/LinkConfig.json";
import UrlItemListPage from "./Pages/UrlItemManagement/UrlItemListPage/UrlItemList";
import LoginPage from "./Pages/LoginPage/LoginPage";
import AuthorizedRoute from "./Components/RoleRoutes/AuthorizedRoute";

import style from "./App.module.sass";
import UrlItemInfoPage from "./Pages/UrlItemManagement/UrlItemInfoPage/UrlItemInfoPage";

function App() {
  return (
    <div className={style.backgroung_style}>
      <AuthProvider>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to={LinkConfig.about}>About</Link>
                </li>
                <li>
                  <Link to={LinkConfig.user_management.login}>Login</Link>
                </li>
                <li>
                  <Link to={LinkConfig.url_item_management.url_item_list}>
                    UrlListPage
                  </Link>
                </li>
                <li>
                  <Link to={LinkConfig.url_item_management.url_item_info}>
                    UrlInfoPage
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* to add a new page just add a route here */}
          <AuthorizedRoute
            exact
            path="/"
            component={UrlItemListPage}
            role={"All"}
          />
          <AuthorizedRoute
            exact
            path="/index"
            component={UrlItemListPage}
            role={"All"}
          />
          <AuthorizedRoute
            exact
            path="/index.html"
            component={UrlItemListPage}
            role={"All"}
          />
          <AuthorizedRoute
            exact
            path={LinkConfig.url_item_management.url_item_list}
            component={UrlItemListPage}
            role={"All"}
          />
          <AuthorizedRoute
            exact
            path={LinkConfig.user_management.login}
            component={LoginPage}
            role={"All"}
          />
          <AuthorizedRoute
            exact
            path={LinkConfig.url_item_management.url_item_info+"/:id"}
            component={
              UrlItemInfoPage}
            role={"User"}
          />
        </Router>
      </AuthProvider>
    </div>
  );
}


export default App;
