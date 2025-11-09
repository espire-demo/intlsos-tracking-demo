import React, { useState } from "react";

const CarePlanForm = ({ onSave }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [version, setVersion] = useState("V1.0");
    const [tags, setTags] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPlan = {
            id: `PLAN-${Math.floor(100000 + Math.random() * 900000)}`, // 6-digit ID
            title,
            description,
            version,
            tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        };
        onSave(newPlan);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 space-y-4"
        >
            <h3 className="text-lg font-semibold text-gray-800">
                Create New Care Plan
            </h3>

            <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                    Plan Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Hypertension Management"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                    placeholder="Brief description of the care plan..."
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                        Version
                    </label>
                    <input
                        type="text"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">
                        Tags (comma separated)
                    </label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g. Daily BP, Medication"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
            >
                Save Care Plan
            </button>
        </form>
    );
};

export default CarePlanForm;
