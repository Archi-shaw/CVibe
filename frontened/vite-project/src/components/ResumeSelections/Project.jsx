import React from 'react'
import ActionLink from './ActionLink'
import { LuGithub , LuExternalLink} from 'react-icons/lu'

const Project = ({ title, description, github, livedemo, bgColor, isPreview }) => {
 return (
  <div className="mb-5">
    <h3
      className={`${
        isPreview ? "text-xs" : "text-base"
      } font-semibold text-gray-900`}
    >
      {title}
    </h3>
    <p className="text-sm text-gray-700 font-medium mt-1">{description}</p>

    <div className="flex items-center gap-3 mt-2">
      {github && <ActionLink icon={<LuGithub />} link={github} bgColor={bgColor} />}
      {livedemo && <ActionLink icon={<LuExternalLink />} link={livedemo} bgColor={bgColor} />}
    </div>
  </div>
);
}

export default Project
