const Overview = ({ data, config }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Overview</h3>

            <div className="grid grid-cols-2 gap-6">
                {config.fields.map((field) => (
                    <div key={field.key}>
                        <p className="text-xs text-gray-400 uppercase">
                            {field.label}
                        </p>
                        <p className="text-gray-700 font-medium">
                            {data[field.key]}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Overview;