const NoteSPData = [
    {id: 0, Designation: 'Administration des bases de données', Coef: '2', NomEnseignant: 'Mansour Borchani', Note_CC: '', Note_TP: '', Note_Exam: '16.5'},
    {id: 1, Designation: 'Angular', Coef: '1', NomEnseignant: 'Mansour Borchani', Note_CC: '', Note_TP: '', Note_Exam: '13'},
    {id: 2, Designation: 'Administration des bases de données', Coef: '3', NomEnseignant: 'Mansour Borchani', Note_CC: '', Note_TP: '', Note_Exam: '10.5'},
    {id: 3,  Designation: 'Architecture n-tiers .NET', Coef: '3', NomEnseignant: 'Mansour Borchani', Note_CC: '', Note_TP: '', Note_Exam: '15.5'},
    {id: 4,  Designation: 'Architecture Orientée Service "SOA"', Coef: '3', NomEnseignant: 'Mansour Borchani', Note_CC: '', Note_TP: '', Note_Exam: '8'},
    {id: 5, Designation: 'Atelier des Services Réseaux ', Coef: '2', NomEnseignant: 'Mansour Borchani', Note_CC: '', Note_TP: '', Note_Exam: '10'},
    {id: 6, Designation: 'Compétences personnelles A', Coef: '2', NomEnseignant: 'Mansour Borchani', Note_CC: '', Note_TP: '', Note_Exam: '4.5'},
    {id: 7, Designation: 'Compétences personnelles F', Coef: '2', NomEnseignant: 'Mansour Borchani', Note_CC: '', Note_TP: '', Note_Exam: '6'},
    {id: 8, Designation: 'Droit', Coef: '2', NomEnseignant: 'Mansour Borchani', Note_CC: '0', Note_TP: '', Note_Exam: '12.24'},
    {id: 9, Designation: 'Framework SPRING', Coef: '2', NomEnseignant: 'Mansour Borchani', Note_CC: '', Note_TP: '', Note_Exam: '7'},
    {id: 10, Designation: 'Intélligence artificielle et système expert', Coef: '3', NomEnseignant: 'Mansour Borchani', Note_CC: '', Note_TP: '', Note_Exam: '12.75'},
  ]
  

const getDesignation = () => {
  let designationSet = new Set();
  NoteSPData.forEach((note) => {
      if(!designationSet.has(note.Designation)){
        designationSet.add(note.Designation);
      }
  });
  return designationSet;
}
const getCoef = () => {
  let CoefSet = new Set();
  NoteSPData.forEach((note) => {
      if(!CoefSet.has(note.Coef)){
        CoefSet.add(note.Coef);
      }
  });
  return CoefSet;
}
const getNomEnseignant = () => {
  let NomEnseignantSet = new Set();
  NoteSPData.forEach((note) => {
      if(!NomEnseignantSet.has(note.NomEnseignant)){
        NomEnseignantSet.add(note.NomEnseignant);
      }
  });
  return NomEnseignantSet;
}

export {getDesignation, getCoef, getNomEnseignant}
export default NoteSPData
