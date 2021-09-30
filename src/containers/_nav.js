import {hasRole} from "../utils/user";
import {userRoles} from "../enums/roles.enum";

const items = [  
];

export default items;

export const getItems = (user) => {
  
  let items = [
   
  ];

  if(!hasRole(user,userRoles.USER_ADMIN)){
  items.push({
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/revue",
    icon: "cil-speedometer",
    badge: {
      color: "info",
      text: "NEW",
    },
  },)}
  // role admin if( admin)
  if(hasRole(user,userRoles.USER_ADMIN)){
  items.push(
    {
      _tag: "CSidebarNavTitle",
      _children: ["Gestion des utilisateurs"],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Utilisateurs",
      to: "/user",
      icon: "cil-drop",
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Afficher",
          to: "/user",
        },
      ],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Groupes",
      to: "/groups",
      icon: "cil-drop",
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Afficher",
          to: "/groups",
        },
      ],
    });
  }
  if(hasRole(user,userRoles.ENS_CHEF) || hasRole(user,userRoles.ENS_UP) || hasRole(user,userRoles.ENS) || hasRole(user,userRoles.DSI)){
    items.push({
      _tag: "CSidebarNavTitle",
      _children: ["Gestions"],
    },
    {
      _tag: "CSidebarNavDropdown",
      name: "Activités RDI",
      to: "/rdi",
      icon: "cil-drop",
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Production",
          to: "/rdi/production",
        },
        {
          _tag: "CSidebarNavItem",
          name: "Réunion",
          to: "/reunion",
        },
      ],
    },);
  }

  if(hasRole(user,userRoles.ENS_UP) || hasRole(user,userRoles.DSI)){
    items.push({
      _tag: "CSidebarNavDropdown",
      name: "Suivi",
      icon: "cil-drop",
      _children: [
        {
          _tag: "CSidebarNavItem",
          name: "Suivi",
          to: "/suivi",
          icon: "cil-speedometer",
        },
      ],
    },)
  }
  return items;
}