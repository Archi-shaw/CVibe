import React from 'react'
import Input from '../../../components/Inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'

const AdditionalForm = ({ interest, languages, updateArrayItem, addnewItem, removeItem }) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">
        Additional Information
      </h2>

      {/* LANGUAGES SECTION */}
      <div className="mb-8">
        <h3 className="text-md font-semibold text-gray-700 mb-3">Languages</h3>
        {languages?.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">
                Language {index + 1}
              </span>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => removeItem("languages", index)}
              >
                <LuTrash2 className="text-[18px]" />
              </button>
            </div>

            <Input
              label="Language"
              placeholder="English, Hindi..."
              type="text"
              value={item.name}
              onChange={({ target }) =>
                updateArrayItem("languages", index, "name", target.value)
              }
            />

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proficiency
              </label>
              <select
                value={item.proficiency || ""}
                onChange={({ target }) =>
                  updateArrayItem("languages", index, "proficiency", target.value)
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Select proficiency</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native</option>
              </select>
            </div>
          </div>
        ))}

        <button
          className="flex items-center gap-2 text-sm cursor-pointer bg-purple-50 border border-purple-200 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
          onClick={() =>
            addnewItem("languages", {
              name: "",
              proficiency: "",
            })
          }
        >
          <LuPlus className="text-[16px]" />
          Add New Language
        </button>
      </div>

      {/* INTEREST SECTION */}
      <div>
        <h3 className="text-md font-semibold text-gray-700 mb-3">Interests</h3>
        {interest?.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">
                Interest {index + 1}
              </span>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => removeItem("interest", index)}
              >
                <LuTrash2 className="text-[18px]" />
              </button>
            </div>

            <Input
              label="Interest"
              placeholder="Reading, Football, Travel..."
              type="text"
              value={item}
              onChange={({ target }) =>
                updateArrayItem("interest", index, "", target.value)
              }
            />
          </div>
        ))}

        <button
          className="flex items-center gap-2 text-sm cursor-pointer bg-purple-50 border border-purple-200 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
          onClick={() => addnewItem("interest", "")}
        >
          <LuPlus className="text-[16px]" />
          Add New Interest
        </button>
      </div>
    </div>
  )
}

export default AdditionalForm
