import React from "react";
import TextField from "../form/TextField.jsx";
import SelectField from "../form/SelectField.jsx";
import TextAreaField from "../form/TextAreaField.jsx";
import UploadBox from "./UploadBox.jsx";

export default function ProfileForm({
                                        config,
                                        values,
                                        onChange,
                                        isEditing,
                                        photoFile,
                                        setPhotoFile,
                                        onSave,
                                    }) {
    return (
        <div className="space-y-12">
            {config.sections.map((section) => (
                <div key={section.title}>
                    <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>

                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {section.withPhoto && (
                            <div className="lg:col-span-4">
                                <UploadBox file={photoFile} onFile={setPhotoFile} />
                            </div>
                        )}

                        <div className={section.withPhoto ? "lg:col-span-8" : "lg:col-span-12"}>
                            <div className={`grid grid-cols-1 gap-6 ${section.grid || ""}`}>
                                {section.fields.map((f) => {
                                    const span = f.span === 2 ? "md:col-span-2" : "";
                                    const common = {
                                        label: f.label,
                                        name: f.name,
                                        value: values[f.name],
                                        onChange,
                                        disabled: !isEditing,
                                    };

                                    if (f.type === "select") {
                                        return (
                                            <div key={f.name} className={span}>
                                                <SelectField
                                                    {...common}
                                                    options={f.options}
                                                    placeholder={f.placeholder}
                                                    disabled={!isEditing || f.readOnly}
                                                />
                                            </div>
                                        );
                                    }

                                    if (f.type === "textarea") {
                                        return (
                                            <div key={f.name} className={span}>
                                                <TextAreaField {...common} disabled={!isEditing || f.readOnly} />
                                            </div>
                                        );
                                    }

                                    // text / number / etc
                                    return (
                                        <div key={f.name} className={span}>
                                            <TextField
                                                {...common}
                                                type={f.type}
                                                placeholder={f.placeholder}
                                                readOnly={f.readOnly}
                                                icon={f.icon}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Save button */}
                            <div className="mt-8">
                                <button
                                    type="button"
                                    onClick={onSave}
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-semibold text-white hover:bg-blue-700 active:bg-blue-800 sm:w-[240px]"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}