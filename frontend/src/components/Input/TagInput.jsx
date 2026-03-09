import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState("");

    // Update input value as user types
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Add a new tag
    const addNewTag = () => {
        const newTag = inputValue.trim();
        if (newTag !== "") {
            setTags([...tags, newTag]); // append to tags
            setInputValue("");
        }
    };

    // Handle Enter key to add tag
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addNewTag();
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div> 
            {tags?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="flex items-center gap-2 bg-slate-100 text-slate-900 px-3 py-1 rounded text-sm"
                        >
                            #{tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                            >
                                <MdClose />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center gap-4 mt-3">
                <input
                    type="text"
                    className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
                    placeholder="Add tags"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    type="button"
                    className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
                    onClick={() => {
                        addNewTag();
                    }}
                >
                    <MdAdd className="text-2xl text-blue-700 hover:text-white" />
                </button>
            </div>

            {/* Display added tags */}
            {/* <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-slate-200 text-slate-800 px-2 py-1 rounded text-sm"
                    >
                        {tag}
                    </span>
                ))}
            </div> */}
        </div >
    );
};

export default TagInput;


