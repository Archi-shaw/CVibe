import React from 'react'
import Input from '../../../components/Inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'

const CertifiactionForm = ({ certifications, updateArrayItem, addnewItem, removeItem }) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">
        Certification Information
      </h2>

      {certifications?.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Certification {index + 1}</h3>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => removeItem(index)}
            >
              <LuTrash2 className="text-[18px]" />
            </button>
          </div>

           <Input
            label="Title"
            placeholder="Certificate of Participation"
            type="text"
            value={item.title}
            onChange={({ target }) =>
              updateArrayItem(index, "title", target.value)
            }
          />
           <Input
              label="Issuer"
              type="text"
              placeholder="Google/Coursera/Udemy..."
              value={item.issuer}
              onChange={({ target }) =>
                updateArrayItem(index, "issuer", target.value)
              }
            />
          <Input
              label="Year"
              type="text"
              placeholder="2024"
              value={item.year}
              onChange={({ target }) =>
                updateArrayItem(index, "year", target.value)
              }
            />
        </div>
      ))}

      <div className="flex justify-start">
        <button
          className="flex items-center gap-2 text-sm cursor-pointer bg-purple-50 border border-purple-200 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
          onClick={() =>
            addnewItem({
               title: "",
              issuer: "",
               year: 0,
             })
          }
        >
          <LuPlus className="text-[16px]" />
          Add New Certificate
        </button>
      </div>
    </div>
  )
}

export default CertifiactionForm
