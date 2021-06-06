import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));




// User routes
const showUsers = React.lazy(() => import('./views/modules/users/showUsers'));
const addUsers = React.lazy(() => import('./views/modules/users/addUser'));
const UserDetails = React.lazy(() => import('./views/modules/users/userDetails'));
const updateUser = React.lazy(() => import('./views/modules/users/updateDetails'));

//Suivi
const Suivi = React.lazy(() => import('./views/modules/suivi/ShowSuivi'));
const revue = React.lazy(() => import('./views/modules/suivi/ShowPerformance'));
// RDI
const productionRdi = React.lazy(() => import('./views/modules/rdi/production/showProduction'));
const reunionRdi = React.lazy(() => import('./views/modules/rdi/reunion/showReunion'));

//icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/user', exact: true,  name: 'Utilisateurs', component: showUsers },
  { path: '/users/:id', exact: true, name: 'Détails de l\'utilisateur', component: UserDetails },
  { path: '/user/add', exact: true, name: 'Ajouter utilisateur', component: addUsers },
  { path: '/user/update/:id', exact: true, name: 'Modifier utilisateur', component: updateUser },
  { path: '/suivi', name: 'Suivi', component: Suivi },
  { path: '/revue', name: 'Suivi', component: revue },
  { path: '/rdi/production', name: 'Production Rdi', component: productionRdi },
  { path: '/rdi/reunion', name: 'Réunion Rdi', component: reunionRdi },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
];

export default routes;
