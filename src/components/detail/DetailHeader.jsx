import { assets } from "../../assets/assets";

const DetailHeader = ({ data }) => {
    return (
        <div className="bg-white flex flex-col md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">
                <img src={data.logo} className="w-16 h-16 rounded-full" />

                <h2 className="text-xl font-semibold">{data.title}</h2>
            </div>

        </div>
    );
};

export default DetailHeader;