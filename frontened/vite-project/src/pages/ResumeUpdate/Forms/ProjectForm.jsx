import React from 'react'
import Input from '../../../components/Inputs/Input'
import { LuTrash2, LuPlus } from 'react-icons/lu'

const ProjectForm = ({ projects, updateArrayItem, addnewItem, removeItem }) => {
  return (
    <div className="px-5 pt-5">
      <h2 className="text-lg font-semibold text-gray-500 mb-4">
        Projects Information
      </h2>

      {projects?.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Project {index + 1}</h3>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => removeItem(index)}
            >
              <LuTrash2 className="text-[18px]" />
            </button>
          </div>

           <Input
            label="Title"
            placeholder="Hand detection"
            type="text"
            value={item.title}
            onChange={({ target }) =>
              updateArrayItem(index, "title", target.value)
            }
          />
           <Input
              label="Description"
              type="text"
              value={item.description}
              onChange={({ target }) =>
                updateArrayItem(index, "description", target.value)
              }
            />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Github Link"
              type="text"
              value={item.github}
              onChange={({ target }) =>
                updateArrayItem(index, "github", target.value)
              }
            />
            <Input
              label="Live Demo LInk"
              type="text"
              value={item.livedemo}
              onChange={({ target }) =>
                updateArrayItem(index, "livedemo", target.value)
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
                title: "",
             description: "",
             github: "",
            livedemo: "",
             })
          }
        >
          <LuPlus className="text-[16px]" />
          Add New Project
        </button>
      </div>
    </div>
  )
}

export default ProjectForm
