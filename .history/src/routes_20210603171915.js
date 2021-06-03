import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));




// User routes
const showUsers = React.lazy(() => import('./views/modules/users/showUsers'));
const addUsers = React.lazy(() => import('./views/modules/users/addUser'));
const UserDetails = React.lazy(() => import('./views/modules/users/userDetails'));
const updateUser = React.lazy(() => import('./views/modules/users/updateDetails'));

//Suivi
const Suivi = React.lazy(() => import('./views/modules/suivi/ShowSuivi'));
// RDI
const productionRdi = React.lazy(() => import('./views/modules/rdi/production/showProduction'));
const reunionRdi = React.lazy(() => import('./views/modules/rdi/reunion/showReunion'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/user', exact: true,  name: 'Utilisateurs', component: showUsers },
  { path: '/users/:id', exact: true, name: 'Détails de l\'utilisateur', component: UserDetails },
  { path: '/user/add', exact: true, name: 'Ajouter utilisateur', component: addUsers },
  { path: '/user/update/:id', exact: true, name: 'Modifier utilisateur', component: updateUser },
  { path: '/suivi', name: 'Suivi', component: Suivi },
  { path: '/rdi/production', name: 'Production Rdi', component: productionRdi },
  { path: '/rdi/reunion', name: 'Réunion Rdi', component: reunionRdi },
];

export default routes;