import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { UserContext } from "./utils/UserContext";
import "./scss/style.scss";
import { queryApi } from "./utils/queryApi";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
//const Register = React.lazy(() => import("./views/pages/register/Register"));
//const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
//const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

export default function App() {
  const [user, setUser] = useState(null);

  const isloggedin = async () => {
    const [user, error] = await queryApi("public/logged", null, "POST");
    if (error) console.error(error);
    else {
      setUser(user);
    }
  };

  useEffect(() => {
    isloggedin();
  }, []);

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <UserContext.Provider value={[user, setUser]}>
            {user && (
              <>
                <Route
                  path="/"
                  name="Home"
                  render={(props) => <TheLayout {...props} />}
                />
              </>
            )}
            <Route
              path="/"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            )
          </UserContext.Provider>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}
