import React from 'react'
import TemplateOne from './TemplateOne';
import TemplateTwo from './TemplateTwo';
// import TemplateThree from './TemplateThree';

const RenderResume = ({ templateId, resumeData, colorPaletes, containerWidth }) => {

  console.log("Template ID:", templateId);
  console.log("Resume Data:", resumeData);
  console.log("Color Palettes:", colorPaletes);

  switch (templateId) {
    case "01":
      return (
        <TemplateOne
          resumeData={resumeData}
          colorPaletes={colorPaletes}
          containerWidth={containerWidth}
        />
      );
    case "02":
      return (
        <TemplateTwo
          resumeData={resumeData}
          colorPaletes={colorPaletes}
          containerWidth={containerWidth}
        />
      );
      case "03":
      return (
        <TemplateOne
          resumeData={resumeData}
          colorPaletes={colorPaletes}
          containerWidth={containerWidth}
        />
      );
    default:
      return (
        <TemplateOne  // Fallback to Template One
          resumeData={resumeData}
          colorPaletes={colorPaletes}
          containerWidth={containerWidth}
        />
      );
  }
};

export default RenderResume;
