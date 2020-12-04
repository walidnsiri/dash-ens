const roles = [
    { id: 1, name: "Admin", hasChild: true },
    { id: 2, pid: 1, name: "Administrateur", role: "admin" },
    { id: 3, pid: 1, name: "Ajouter/Changer les rôles", role: "addRoles" },
    { id: 4, name: "Club", hasChild: true },
    { id: 5, pid: 4, name: "Créer un Club", role: "createClub" },
    { id: 6, pid: 4, name: "Modifier un Club", role: "updateClub" },
    { id: 7, pid: 4, name: "Supprimer un Club", role: "deleteClub" },
    { id: 8, name: "Partenariat", hasChild: true },
    { id: 9, pid: 8, name: "Créer un partenariat", role: "createPartnership" },
    { id: 10, pid: 8, name: "Modifier un partenariat", role: "updatePartnership" },
    { id: 11, pid: 8, name: "Supprimer un partenariat", role: "deletePartnership" },
    { id: 12, name: "Article", hasChild: true },
    { id: 13, pid: 12, name: "Créer un article de presse", role: "createPress" },
    { id: 14, pid: 12, name: "Modifier un article de presse", role: "updatePress" },
    { id: 15, pid: 12, name: "Supprimer un article de presse", role: "deletePress" },
    { id: 16, pid: 12, name: "Gérer les articles archivés", role: "handleArchivedPress" },
    { id: 17, name: "RDI", hasChild: true },
    { id: 18, pid: 17, name: "Créer une équipe d'RDI", role: "createRdi" },
    { id: 19, pid: 17, name: "Modifier une équipe d'RDI", role: "updateRdi" },
    { id: 20, pid: 17, name: "Supprimer une équipe d'RDI", role: "deleteRdi" },
    { id: 21, pid: 17, name: "Créer un membre RDI", role: "createMember" },
    { id: 22, pid: 17, name: "Modifier un membre RDI", role: "updateMember" },
    { id: 23, pid: 17, name: "Supprimer un membre RDI", role: "deleteMember" },
    { id: 24, name: "Slider", hasChild: true },
    { id: 25, pid: 24, name: "Créer un slider", role: "createSlider" },
    { id: 26, pid: 24, name: "Modifier un slider", role: "updateSlider" },
    { id: 27, pid: 24, name: "Supprimer un slider", role: "deleteSlider" },
    { id: 28, pid: 24, name: "Gérer les slider archivés", role: "handleArchivedSlider" },
    { id: 29, name: "Event", hasChild: true },
    { id: 30, pid: 29, role: "createEvent", name: "Créer un événement" },
    { id: 31, pid: 29, role: "updateEvent", name: "Modifier un événement"  },
    { id: 32, pid: 29, role: "deleteEvent", name: "Supprimer un événement" },
    { id: 33, pid: 29, role: "handleArchivedEvent", name: "Gérer les événements archivés" },
    { id: 34, name: "TimeTable", hasChild: true },
    { id: 35, pid: 34, role: "createTimeTable", name: "Créer un emploi du temps" },
    { id: 36, pid: 34, role: "updateTimeTable", name: "Modifier un emploi du temps"  },
    { id: 37, pid: 34, role: "deleteTimeTable", name: "Supprimer un emploi du temps" },
    { id: 38, pid: 34, role: "handleArchivedTimeTable", name: "Gérer les emploi du temps" },
  ];


  const field = {
    dataSource: roles,
    id: "id",
    parentID: "pid",
    text: "name",
    hasChildren: "hasChild",
  };
  const isChecked = true;
  const cssClass = "custom";

  export {roles, field , isChecked, cssClass};