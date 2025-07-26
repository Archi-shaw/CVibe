import React from 'react'
import Input from '../../../components/Inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'

const SkillForm = ({ skills, updateArrayItem, addnewItem, removeItem }) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">
        Skill Information
      </h2>

      {skills?.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Skills {index + 1}</h3>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => removeItem(index)}
            >
              <LuTrash2 className="text-[18px]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
            label="Name"
            placeholder="C++"
            type="text"
            value={item.name}
            onChange={({ target }) =>
              updateArrayItem(index, "name", target.value)
            }
          />
            <Input
              label="Progress"
              type="text"
              value={item.progress}
              onChange={({ target }) =>
                updateArrayItem(index, "progress", target.value)
              }
            />
          </div>
        </div>
      ))}

      <div className="flex justify-start">
        <button
          className="flex items-center gap-2 text-sm cursor-pointer bg-purple-50 border border-purple-200 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
          onClick={() =>
            addnewItem({
              name:"",
              progress:0,
            })
          }
        >
          <LuPlus className="text-[16px]" />
          Add New Skill
        </button>
      </div>
    </div>
  )
}

export default SkillForm
