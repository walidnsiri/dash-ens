const absenceData = [
    {id: 0, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '10:45 à 12:15', Justification: 'Absence injustifiée'},
    {id: 1, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 2, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 3, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 4, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 5, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 6, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 7, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 8, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 9, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 10, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 11, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 12, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 13, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 14, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 15, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 16, Module: 'Réseaux de communication', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
    {id: 17, Module: 'SOA', Date: '2018/01/01', NSéance: '9:00 à 10:30', Justification: 'Absence justifiée'},
  ]
  

const getModules = () => {
  let absset = new Set();
  absenceData.forEach((abs) => {
      if(!absset.has(abs.Module)){
          absset.add(abs.Module);
      }
  });
  return absset;
}
const getNSeance = () => {
  let NseanceSet = new Set();
  absenceData.forEach((abs) => {
      if(!NseanceSet.has(abs.NSéance)){
        NseanceSet.add(abs.NSéance);
      }
  });
  return NseanceSet;
}
const getJustification = () => {
  let JustificationSet = new Set();
  absenceData.forEach((abs) => {
      if(!JustificationSet.has(abs.Justification)){
        JustificationSet.add(abs.Justification);
      }
  });
  return JustificationSet;
}

export {getModules, getNSeance, getJustification}
export default absenceData
