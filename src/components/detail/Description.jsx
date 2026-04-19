const Description = ({ data }) => {
    return (
        <div>
            
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-600 mb-6">{data.about_us}</p>

        </div>
    );
};

export default Description;