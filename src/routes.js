import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));




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

//icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));

//Notifications
const showNotifications = React.lazy(() => import('./views/modules/notifications/showNotification'));
const notificationDetails = React.lazy(() => import('./views/modules/notifications/notificationDetails'));

//Followups
const showFollowups = React.lazy(() => import('./views/modules/followups/showFollowup'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/user', exact: true,  name: 'Utilisateurs', component: showUsers },
  { path: '/user/add', exact: true, name: 'Ajouter utilisateur', component: addUsers },
  { path: '/user/update', exact: true, name: 'Modifier utilisateur', component: updateUsers },
  { path: '/suivi', name: 'Suivi', component: Suivi },
  { path: '/revue', name: 'revue', component: revue },
  { path: '/rdi/production', name: 'Production Rdi', component: productionRdi },
  { path: '/productionRdi/add', name: 'Ajouter Production Rdi', component: addproductionRdi },
  { path: '/productionRdi/edit', name: 'Modifier Production Rdi', component: updateproductionRdi },
  { path: '/reunion', name: 'Réunion Rdi', component: reunionRdi },
  { path: '/reunionRdi/add', name: 'Ajouter Réunion Rdi', component: addreunionRdi },
  { path: '/reunionRdi/edit', name: 'Modifier Réunion Rdi', component: updateReunionRdi },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: showNotifications },
  { path: '/notifications/details', name: 'détails de la notification', component: notificationDetails },
  { path: '/followups', name: 'Notification de Suivi', component: showFollowups },
];

export default routes;
