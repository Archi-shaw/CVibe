import React from 'react'
import Input from '../../../components/Inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'

const EducationForm = ({ education, updateArrayItem, addnewItem, removeItem }) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">
        Education Information
      </h2>

      {education?.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Education {index + 1}</h3>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => removeItem(index)}
            >
              <LuTrash2 className="text-[18px]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
            label="Degree"
            placeholder="Btech"
            type="text"
            value={item.degree}
            onChange={({ target }) =>
              updateArrayItem(index, "degree", target.value)
            }
          />
            <Input
              label="Instituition"
              placeholder="KIIT"
              type="text"
              value={item.instituition}
              onChange={({ target }) =>
                updateArrayItem(index, "instituition", target.value)
              }
            />
            <Input
              label="Start Date"
              placeholder="Start Date"
              type="date"
              value={item.startDate}
              onChange={({ target }) =>
                updateArrayItem(index, "startDate", target.value)
              }
            />
            <Input
              label="End Date"
              placeholder="End Date"
              type="date"
              value={item.endDate}
              onChange={({ target }) =>
                updateArrayItem(index, "endDate", target.value)
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
            degree: "",
        instituition: "",
        startDate: "",
        endDate: "",
            })
          }
        >
          <LuPlus className="text-[16px]" />
          Add New Education
        </button>
      </div>
    </div>
  )
}

export default EducationForm
