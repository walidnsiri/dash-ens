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
const showResultatSP = React.lazy(() => import('./views/modules/EspaceEtudiantParent/ResultatEtNotes/Resultat_SP/showResultatSP'));
const showResultatSR = React.lazy(() => import('./views/modules/EspaceEtudiantParent/ResultatEtNotes/Resultat_SR/showResultatSR'));
// Emploi
const emploi = React.lazy(() => import('./views/modules/EspaceEtudiantParent/EmploiDuTemps/Emploi'));
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
  { path: '/absence', name: 'Absence', component: Absence },
  { path: '/resultat/notesSP', name: 'Notes Des Modules', component: NoteSP },
  { path: '/resultat/notesSR', name: 'Notes Des Modules', component: NoteSR },
  { path: '/resultat/resultatSP', name: 'Résultat de la session principale', component: showResultatSP },
  { path: '/resultat/resultatSR', name: 'Résultat de la session rattrapage', component: showResultatSR },
  { path: '/emploi', name: 'Emploi du temps', component: emploi },
  { path: '/rdi/production', name: 'Production Rdi', component: productionRdi },
  { path: '/rdi/reunion', name: 'Réunion Rdi', component: reunionRdi },
];

export default routes;
