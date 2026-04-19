import React, { useEffect, useState } from "react";
import { detailConfig } from "../../config/detailConfig";
import DetailHeader from "../../components/detail/DetailHeader";
import Description from "../../components/detail/Description";
import Overview from "../../components/detail/Overview";
import Header from "../../components/commons/Header";
import Pagination from "../../components/list/Pagination";
import Footer from "../../components/commons/Footer";
import { assets } from "../../assets/assets";

const DetailPage = () => {

    const data = {
        title: "SDU",
        logo: assets.university_icon,

        email: "career@company.com",
        contact: "+7(707) 777 77 77",
        website: "https://company.com",
        type: "Private",

        about_us:
            "About Us",

    };

    const config = detailConfig.jobs;

    return (
        <div className="min-h-screen">
            <Header />
            <div className="bg-gray-100 mt-20">
                <div className="max-w-7xl mx-auto py-8 px-6">
                    <h1 className="text-2xl font-medium">Details</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">

                <DetailHeader data={data} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">

                    <div className="lg:col-span-2">
                        <Description data={data} />
                    </div>


                    <Overview data={data} config={config} />

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default DetailPage;
