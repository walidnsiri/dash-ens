import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));




// User routes
const showUsers = React.lazy(() => import('./views/modules/users/showUsers'));
const addUsers = React.lazy(() => import('./views/modules/users/addUser'));
const UserDetails = React.lazy(() => import('./views/modules/users/userDetails'));
const updateUser = React.lazy(() => import('./views/modules/users/updateDetails'));

//Absence
const Absence = React.lazy(() => import('./views/modules/EspaceEtudiantParent/Absences/ShowAbsence'));
// Resultat
const NoteSP = React.lazy(() => import('./views/modules/EspaceEtudiantParent/ResultatEtNotes/Notes_SP/ShowNoteSP'));
const NoteSR = React.lazy(() => import('./views/modules/EspaceEtudiantParent/ResultatEtNotes/Notes_SR/ShowNoteSR'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/user', exact: true,  name: 'Utilisateurs', component: showUsers },
  { path: '/users/:id', exact: true, name: 'Détails de l\'utilisateur', component: UserDetails },
  { path: '/user/add', exact: true, name: 'Ajouter utilisateur', component: addUsers },
  { path: '/user/update/:id', exact: true, name: 'Modifier utilisateur', component: updateUser },
  { path: '/absence', name: 'Absence', component: Absence },
  { path: '/resultat/notesSP', name: 'Notes Des Modules', component: NoteSP },
  { path: '/resultat/notesSR', name: 'Notes Des Modules', component: NoteSR },
];

export default routes;
