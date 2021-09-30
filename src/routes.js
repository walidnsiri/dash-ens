import React from 'react';
import {hasRole} from "./utils/user";
import {userRoles} from "./enums/roles.enum";

// User routes
const showUsers = React.lazy(() => import('./views/modules/users/showUsers'));
const addUsers = React.lazy(() => import('./views/modules/users/addUser'));
const updateUsers = React.lazy(() => import('./views/modules/users/updateUser'));

//Suivi
const Suivi = React.lazy(() => import('./views/modules/suivi/ShowSuivi'));
const revue = React.lazy(() => import('./views/modules/suivi/ShowRevue'));

// Production RDI
const productionRdi = React.lazy(() => import('./views/modules/rdi/production/showProduction'));
const addproductionRdi = React.lazy(() => import('./views/modules/rdi/production/addProduction'));
const updateproductionRdi = React.lazy(() => import('./views/modules/rdi/production/updateProduction'));

// Reunion RDI
const reunionRdi = React.lazy(() => import('./views/modules/rdi/reunion/showReunion'));
const addreunionRdi = React.lazy(() => import('./views/modules/rdi/reunion/addReunion'));
const updateReunionRdi = React.lazy(() => import('./views/modules/rdi/reunion/updateReunion'));

//Notifications
const showNotifications = React.lazy(() => import('./views/modules/notifications/showNotification'));
const notificationDetails = React.lazy(() => import('./views/modules/notifications/notificationDetails'));

//Followups
const showFollowups = React.lazy(() => import('./views/modules/followups/showFollowup'));

//Groups
const showGroups = React.lazy(() => import('./views/modules/groups/showGroups'));

export const getRoutes = (user) => {
  const routes = [];
  //admin routes
  if(hasRole(user,userRoles.USER_ADMIN)){
    routes.push(
    { path: '/user', exact: true,  name: 'Utilisateurs', component: showUsers },
    { path: '/user/add', exact: true, name: 'Ajouter utilisateur', component: addUsers },
    { path: '/user/update', exact: true, name: 'Modifier utilisateur', component: updateUsers },
    { path: '/groups', name: 'Groupes', component: showGroups },
    );
  }
  //cup or dsi
  if(!hasRole(user,userRoles.USER_ADMIN)){
    routes.push( { path: '/revue', name: 'Dashboard', component: revue },)
  }
  //all except admin
  if(!hasRole(user,userRoles.USER_ADMIN)){
    routes.push(
    { path: '/suivi', name: 'Suivi', component: Suivi },
    { path: '/rdi/production', name: 'Production Rdi', component: productionRdi },
    { path: '/productionRdi/add', name: 'Ajouter Production Rdi', component: addproductionRdi },
    { path: '/productionRdi/edit', name: 'Modifier Production Rdi', component: updateproductionRdi },
    { path: '/reunion', name: 'Réunion Rdi', component: reunionRdi },
    { path: '/reunionRdi/add', name: 'Ajouter Réunion Rdi', component: addreunionRdi },
    { path: '/reunionRdi/edit', name: 'Modifier Réunion Rdi', component: updateReunionRdi },)
  }
  //all except admin and dsi
  if(!hasRole(user,userRoles.USER_ADMIN) && !hasRole(user,userRoles.DSI)){
  routes.push(
  { path: '/notifications', name: 'Notifications', component: showNotifications },
  { path: '/notifications/details', name: 'détails de la notification', component: notificationDetails },
  { path: '/followups', name: 'Notification de Suivi', component: showFollowups },
  );
  }

  console.log(routes)
  return routes;
}
/*const routes = [
  
  { path: '/', exact: true, name: 'Home' },
];*/
