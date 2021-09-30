import React, { Suspense,useContext } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import { UserContext } from "../utils/UserContext";
// routes config
import {getRoutes} from '../routes'
import {hasRole} from "../utils/user";
import {userRoles} from "../enums/roles.enum";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {

  const [user,] = useContext(UserContext);

  return (
    <main className="h-100">
      <CContainer fluid className="h-100">
        <Suspense fallback={loading}>
          <Switch>
            {getRoutes(user).map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade className="h-100">
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
           { (!hasRole(user,userRoles.USER_ADMIN) &&  !hasRole(user,userRoles.DSI)) ?  <Redirect from="/" to="/revue" />: <Redirect from="/" to="/user" />}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
