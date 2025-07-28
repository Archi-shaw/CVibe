import React from 'react'
import TemplateOne from './TemplateOne';
import TemplateTwo from './TemplateTwo';

const RenderResume = ({ templateId , resumeData, colorPaletes,  containerWidth}) => {
  switch (templateId){
    case "01":
        return (
            <TemplateOne
            resumeData={resumeData}
            colorPaletes={colorPaletes}
            containerWidth={containerWidth}
            />
        );
    default :
        return (
            <TemplateTwo 
            resumeData={resumeData}
            colorPaletes={colorPaletes}
            containerWidth={containerWidth}
            />
        )
  };
};

export default RenderResume;
