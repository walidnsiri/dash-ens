import React, { useState, useEffect, useContext } from "react";
import {
    CCard,
    CCardBody,
    CCardTitle,
    CCol,
    CRow,
    CFormGroup,
    CInputCheckbox,
    CLabel,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CButton,
    CPagination,
    CAlert,
    CSwitch,
    CInputRadio,
    CImg,
    CBadge,
} from "@coreui/react";
import useravatar from "../../../assets/img/avatars/user.png";
import CIcon from "@coreui/icons-react";
import GroupDetails from "./groupDetails";
import { UserContext } from "../../../utils/UserContext";
import { queryApi } from "../../../utils/queryApi";
import Moment from 'react-moment';
import moment from 'moment'

import { LoaderSmall } from "../../../views/components/custom/Loaders";
import { trackPromise } from 'react-promise-tracker';

import { fetchImageFromService } from "../../../utils/getImage";
import { useSelector } from 'react-redux'
import { selectGroupRdi, selectGroupUP } from '../../../features/groupSlice';


const Groups = (props) => {
    const { sort, clicked } = props;
    moment.locale("fr");
    const [user,] = useContext(UserContext)
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [group, setGroup] = useState({});
    const [loading, setLoading] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filtered, setFiltered] = useState(false);
    const [isAnswered, setIsAnswered] = useState("");
    const [type, setType] = useState("");
    const groupRDI = useSelector(selectGroupRdi);
    const groupUP = useSelector(selectGroupUP);
    const [createdUserId, setCreatedUserId] = useState("");

    const convertUserfullNameToId = (groupRDI, searchInput) => {
        let userids = [];
        if (groupRDI) {
            let users = groupRDI.users;
            users.map((user, index) => {
                if (user.fullName.toLowerCase().includes(searchInput)) {
                    userids.push(user.id);
                }
            })
        }
        setCreatedUserId(userids[0] ? userids[0] : "empty");
    }

    useEffect(() => {
        if (clicked[1]) {
            setType("");
        }
        if (clicked[2]) {
            setType("up");

        };
        if (clicked[3]) {
            setType("rdi");
        }
        setCreatedUserId("");
        setSearchInput("");

    }, [clicked]);

    const fetchimg = async (im) => {
        const img = await fetchImageFromService(im);
        if (img) return img;
    };
    const fetchUser = async (id, index, notifs) => {
        const [res, error] = await queryApi("user/" + id);
        if (res) {
            const img = await fetchimg(res.image);
            notifs[index] = { ...notifs[index], "fullName": res.fullName, "image": img };
            return notifs;
        }
    }

    const fetchUserImage = async(user)  => {
        const img = await fetchimg(user.image);
        return {...user, "image" : img? img : ""}
      }
      

    useEffect(() => { setPageNumber(1); setGroups([]) }, [sort, type, createdUserId])

    useEffect(() => {
        const fetchGroups = async () => {

            const body = {
                pageRequest: {
                    number: pageNumber,
                    limit: 6,
                    sort: sort
                },
                query: {
                    //"userId": user.id,
                    "type": type,
                },
            };
            const [res, error] = await queryApi("group/search", body, "POST");
            if (res) {
                if (pageNumber === 1) {
                    let grps = res.groups;
                    //fetch users inside groups!
                    const grups = await Promise.all(grps.map(async (grp, index) => {
                        grp.users.map(async (user, index2) => {
                            return grps[index].users[index2] = await fetchUserImage(user);
                        })
                        return grps[index];
                    }));
                    setGroup({ ...grups[0] });
                    if (grups.length > 0) {
                        setGroups(grups);
                    }
                    setTotalPages(res.totalPages)
                    setError(null);
                    if (grups.length == 0) setGroup({});
                }
                else {
                    let grps = res.groups;
                    //fetch users inside groups!
                    const grups = await Promise.all(grps.map(async (grp, index) => {
                        grp.users.map(async (user, index2) => {
                            return grps[index].users[index2] = await fetchUserImage(user);
                        })
                        return grps[index];
                    }));
                    setGroups([...groups, ...grups])
                    setTotalPages(res.totalPages)
                    setError(null);
                }
            }
            if (error) {
                setError(error);
                setGroups([]);
                setTotalPages(1);
            }
        };
        trackPromise(fetchGroups());
    }, [pageNumber, sort, type, createdUserId]);



    const handleInputChange = (e) => {
        if (e.target.value == "") {
            setFiltered(false)
            setCreatedUserId("");
        } else {
            setFiltered(true)
        }
        setSearchInput(e.target.value);
        if (type == 'rdi') {
            convertUserfullNameToId(groupRDI, e.target.value);
        }
        if (type == 'up') {
            convertUserfullNameToId(groupUP, e.target.value);
        }
    }



    const handleScroll = (e) => {
        const target = e.target;
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            if (pageNumber < totalPages) {
                setPageNumber(pageNumber + 1);
            }

        }
    }

    const handleGroupClick = (index) => {
        setGroup({ ...groups[index] });
    }


    return (
        <CRow>
            <CCol lg="12" md="12" sm="12" xs="12" xl={groups?.length > 0 ? "4" : "12"} xxl={groups?.length > 0 ? "4" : "12"}>

                <CInputGroup className="input-group-notification">
                    <CInputGroupPrepend>
                        <CButton
                            type="button"

                            color="primary"
                            className="shadow-lg search-button-notification"
                            style={{ zIndex: 1, backgroundColor: "rgb(231, 76, 60)", borderColor: "rgb(231, 76, 60)" }}

                        >
                            <CIcon name="cil-magnifying-glass" />
                        </CButton>
                    </CInputGroupPrepend>
                    <CInput
                        id="input1-group2"
                        name="input1-group2"
                        placeholder="Rechercher par enseignant.."
                        value={searchInput}
                        onChange={e => handleInputChange(e)}
                        className="shadow-sm bg-white rounded border-0 search-bar-group"
                        style={{ zIndex: 0 }}
                    />
                </CInputGroup>
                <div className="scroll-notifs" id="notif-scroll" onScroll={e => handleScroll(e)}>
                    {groups?.map((group, index) => (
                        <CCard
                            key={index}
                            onClick={(e) => { handleGroupClick(index) }}
                        >
                            <CCardBody>
                                <div className="message">
                                    <div className="pt-3 mr-3 float-left">
                                        <div className="c-avatar">
                                            <CImg
                                                src={group?.image ? group?.image : useravatar}
                                                className="c-avatar-img"
                                                alt="admin@bootstrapmaster.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <small className="text-muted">{group?.type}</small>
                                        <small className="text-muted float-right mt-1">

                                            <Moment fromNow locale="fr">{group?.createdAt}</Moment>
                                        </small>
                                    </div>
                                    <div className="text-truncate font-weight-bold">
                                        <span className="fa fa-exclamation text-danger"></span>
                                        Groupe {group?.type}
                                    </div>
                                    <div className="small text-muted text-truncate">
                                        {moment(group?.modifiedAt).format('L')}
                                    </div>
                                </div>
                            </CCardBody>
                        </CCard>

                    ))}
                    <LoaderSmall />
                </div>
            </CCol>
            {groups?.length > 0 ?
                <CCol xs="12" sm="12" md="12" lg="12" xl="8" xxl="8">
                    <GroupDetails group={group} />
                </CCol> :
                <CCol sm="12" xl="12" xs="12" md="12" style={{ paddingTop: "4%" }}>
                    <CAlert color="warning" className="h-100">
                        Pas de groupes trouvés.
                    </CAlert>
                </CCol>
            }
        </CRow>
    );
};

export default Groups;
