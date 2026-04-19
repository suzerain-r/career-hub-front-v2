import React, { useEffect, useState } from "react";
import Header from "../../components/commons/Header.jsx";
import LandingCount from "../../components/landing/LandingCount.jsx";
import { assets } from "../../assets/assets.js";
import LandingUniversityCardList from "../../components/landing/LandingUniversityCardList.jsx";
import About from "../../components/landing/About.jsx";
import Footer from "../../components/commons/Footer.jsx";
import Hero from "../../components/landing/Hero.jsx";
import ContactUs from "../../components/landing/ContactUs.jsx";
import homeService, { fetchUniversities } from "../../services/apiService.js";

const Landing = () => {

    const [countStudents, setCountStudents] = useState('');
    const [countUniversities, setCountUniversities] = useState('');
    const [countCompanies, setCountCompanies] = useState('');


    const handleCount = () => {

        homeService.getStudentsCount().then((data) => { setCountStudents(data['totalElements']); });

        homeService.getCompaniesCount().then((data) => { setCountCompanies(data['totalElements']); });

        homeService.getUniversitiesCount().then((data) => { setCountUniversities(data['totalElements']); });

    }

    useEffect(() => {
        handleCount();
    }, []);


    return (
        <div className='w-full overflow-hidden'>
            <Header />
            <Hero />
            <About />
            <div className='container mx-auto py-16 px-6 md:px-20 lg:px-32 w-full overflow-hidden'>
                <div className='flex flex-wrap justify-center gap-8'>
                    <LandingCount
                        logo={assets.candidate_icon}
                        count={countStudents}
                        type={'Candidates'}
                    />
                    <LandingCount
                        logo={assets.university_icon}
                        count={countUniversities}
                        type={'Universities'}
                    />
                    <LandingCount
                        logo={assets.company_icon}
                        count={countCompanies}
                        type={'Companies'}
                    />
                </div>
            </div>
            <picture>
                <source
                    media="(min-width: 768px)"
                    srcSet={assets.how_work_info}
                />
                <img
                    src={assets.how_work_mobile}
                    alt=""
                    className="w-full"
                />
            </picture>
            <LandingUniversityCardList />
            {/* <ContactUs /> */}
            <Footer />

        </div>



        //     {selectedUniversity && (
        //
        //
        //         <div className="modal-overlay" onClick={closeModal}>
        //             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        //                 <button className="modal-close" onClick={closeModal}>×</button>
        //                 <div className="modal-header">
        //                     <img
        //                         src={universityIcon}
        //                         className="university_logo"
        //                         alt={""}/>
        //                     <div className="header-info">
        //                         <h2>{selectedUniversity.name}</h2>
        //                         <p><strong>Type:</strong> {selectedUniversity.type}</p>
        //                     </div>
        //                 </div>
        //
        //                 <div className="main-section">
        //                     <div className="left-side">
        //                         <div className="about-us-container">
        //                             <h2>Information about university</h2>
        //                             <p>{selectedUniversity.aboutUs}</p>
        //                         </div>
        //                     </div>
        //
        //                     <div className="right-side">
        //                         <h3>Contact Information</h3>
        //                         <div className="contact-item">
        //                             <img
        //                                 src={websiteIcon}
        //                                 className="icon"
        //                                 alt={""}/>
        //                             <div className="contact-item-info">
        //                                 <p className="label">WEBSITE</p>
        //                                 <p><a href={selectedUniversity.website} target="_blank"
        //                                       rel="noopener noreferrer">{selectedUniversity.website}</a></p>
        //                             </div>
        //                         </div>
        //                         <div className="contact-item">
        //                             <img
        //                                 src={locationIcon}
        //                                 className="icon"
        //                                 alt={""}/>
        //                             <div className="contact-item-info">
        //                                 <p className="label">LOCATION</p>
        //                                 <p>{selectedUniversity.location}</p>
        //                             </div>
        //                         </div>
        //                         <div className="contact-item">
        //                             <img
        //                                 src={phoneIcon}
        //                                 className="icon"
        //                                 alt={""}/>
        //                             <div className="contact-item-info">
        //                                 <p className="label">PHONE</p>
        //                                 <p>{selectedUniversity.contactPhone}</p>
        //                             </div>
        //                         </div>
        //                         <div className="contact-item">
        //                             <img
        //                                 src={emailIcon}
        //                                 className="icon"
        //                                 alt={""}/>
        //                             <div className="contact-item-info">
        //                                 <p className="label">EMAIL ADDRESS</p>
        //                                 <p><a href={selectedUniversity.email}>{selectedUniversity.email}</a></p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     )}
        //
        // </div>
    );
};

export default Landing;
