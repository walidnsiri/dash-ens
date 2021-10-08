import React, { useEffect, useState, useContext } from "react";
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
    CButton,
    CCallout,
    CCarousel,
    CCarouselItem,
    CCarouselCaption,
    CCarouselControl,
    CCarouselIndicators,
    CCarouselInner

} from "@coreui/react";
import { CImg } from "@coreui/react";
import Deck from "../../components/custom/deck";

import avatar from "../../../assets/img/avatars/user.png";

import bronzecuptrophy from "../../../assets/img/3.jpg";
import silvercuptrophy from "../../../assets/img/2.jpg";
import goldcuptrophy from "../../../assets/img/1.jpg";

import { LoaderSmallArea } from "../../../views/components/custom/Loaders";
import { trackPromise } from 'react-promise-tracker';
import { areas } from "../../../constants/areas";

import { queryApi } from "../../../utils/queryApi";
import { fetchImageFromService } from "../../../utils/getImage";
import { UserContext } from "../../../utils/UserContext";
import { userRoles } from "../../../enums/roles.enum";
import { hasRole, getUserIds } from "../../../utils/user";

const ShowProfil = () => {

    const [user,] = useContext(UserContext)

    return (<>
        <CRow>
            <CCol xs="12" sm="12" md="12" lg="12" xl="12">
                <CCard className="border-0 shadow-sm pb-1 card-backg">
                    <CCardBody>
                        <CRow>
                            <CCol xs="12" sm="12" md="12" lg="12" xl="12">
                                <div className="suivi-card-info">
                                    <div className="mr-4">
                                        <div className="avatar-lg mr-4 mt-1">
                                            <CImg
                                                src={avatar}
                                                className="c-avatar-img"
                                                alt="admin@bootstrapmaster.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="suivi-card-body-info">
                                        <div className="mb-2">
                                            <h2 className="mt-1">Walid Nsiri</h2>
                                            <div className="d-inline-block">
                                                <p>
                                                    <b>Grade:</b> Assistant Technologue
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <b>Tel: </b>
                                            <b>+216 52566912</b>
                                        </div>
                                        <div>
                                            <b>E-mail: </b>
                                            <b>@blabla.tn</b>
                                        </div>
                                    </div>
                                </div>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol className="mt-5">
                {/*<CCarousel>
                    <CCarouselIndicators color="red"></CCarouselIndicators>
                    <CCarouselInner style={{"backgroundColor":"#EEE2DC"}}>
                        <CCarouselItem >

                            <CImg className="d-block w-100" src={goldcuptrophy} alt="slide 1" style={{ "textAlign": "center", "margin": "auto" }} />

                            <CCarouselCaption className="d-none d-md-block" style={{ "color": "#EEE2DC" }}>

                                <h1 >Meilleur performance de l'année</h1>

                                <h1>x5</h1>

                            </CCarouselCaption>

                        </CCarouselItem>

                        <CCarouselItem>

                            <CImg className="d-block w-100" src={silvercuptrophy} alt="slide 2" style={{ "textAlign": "center", "margin": "auto" }} />

                            <CCarouselCaption className="d-none d-md-block" style={{ "color": "#EEE2DC" }}>

                                <h1>Meilleur performance du mois</h1>

                                <h2>x5</h2>

                            </CCarouselCaption>

                        </CCarouselItem>

                        <CCarouselItem>

                            <CImg className="d-block w-100" src={bronzecuptrophy} alt="slide 3" style={{  "textAlign": "center", "margin": "auto" }} />

                            <CCarouselCaption className="d-none d-md-block" style={{ "color": "#EEE2DC" }}>

                                <h1>Meilleur performance de la semaine</h1>
                                ESPRIT
                                <h3>x5</h3>

                            </CCarouselCaption>

                        </CCarouselItem>
                    </CCarouselInner>
                    <CCarouselControl color="black" direction='next' />
                    <CCarouselControl color="black" direction='prev'/>
                </CCarousel>
                */}
                <Deck style={{marginTop:"100px"}}/>
            </CCol>
        </CRow>


    </>);
}

export default ShowProfil;