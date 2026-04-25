import React, { useEffect, useState } from "react";
import Header from "../../components/commons/Header.jsx";
import LandingCount from "../../components/landing/LandingCount.jsx";
import { assets } from "../../assets/assets.js";
import LandingUniversityCardList from "../../components/landing/LandingUniversityCardList.jsx";
import About from "../../components/landing/About.jsx";
import Footer from "../../components/commons/Footer.jsx";
import Hero from "../../components/landing/Hero.jsx";
import homeService from "../../services/apiService.js";

const Landing = () => {

    const [counts, setCounts] = useState({
        students: 0,
        universities: 0,
        companies: 0,
    });

    useEffect(() => {
        const loadCounts = async () => {
            try {
                const [students, companies, universities] = await Promise.all([
                    homeService.getStudentsCount(),
                    homeService.getCompaniesCount(),
                    homeService.getUniversitiesCount(),
                ]);

                setCounts({
                    students: students.totalElements || 0,
                    companies: companies.totalElements || 0,
                    universities: universities.totalElements || 0,
                });
            } catch (e) {
                console.error("Error loading counts:", e);
            }
        };

        loadCounts();
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
                        count={counts.students}
                        type="Candidates"
                    />
                    <LandingCount
                        logo={assets.university_icon}
                        count={counts.universities}
                        type="Universities"
                    />
                    <LandingCount
                        logo={assets.company_icon}
                        count={counts.companies}
                        type="Companies"
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
            <Footer />
        </div>
    );
};

export default Landing;