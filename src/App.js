import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import { UserContext } from "./utils/UserContext";
import { getUserFromToken } from "./utils/getUserFromToken";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
//const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
//const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

export default function App() {
  const [user] = useState(getUserFromToken());

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
            {user &
            (<>
              <Route
                path="/"
                name="Home"
                render={(props) => <TheLayout {...props} />}
              />
              </>
            )}
            {!user && (
              <>
                <Route
                 path="/"
                 name="Home"
                 render={(props) => <TheLayout {...props} />}
                />
                <Route
                  path="/login"
                  name="Login Page"
                  render={(props) => <Login {...props} />}
                />
                <Redirect to="/login" />
              </>
            )}
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}
