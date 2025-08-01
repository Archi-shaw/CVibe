// import React from "react";
// import Progress from "./Progress";

// const LanguageInfo = ({ language, progress, accentColor, bgColor }) => {
//   return (
//     <div className="flex items-center justify-between">
//       <p className="text-[12px] font-semibold">{language}</p>
//       {progress > 0 && (
//         <Progress
//           progress={(progress / 100) * 5}
//           color={accentColor}
//           bgColor={bgColor}
//         />
//       )}
//     </div>
//   );
// };

// const LanguageSection = ({ languages, accentColor, bgColor }) => {
//   return (
//     <div className="flex flex-col gap-2">
//       {languages.map((language, index) => (
//         <LanguageInfo 
//           // key={`languages_${index}`}
//           language={language.name}
//           progress={language.progress}
//           accentColor={accentColor}
//           bgColor={bgColor}
//         />
//       ))}
//     </div>
//   );
// };


// export default LanguageSection;


import React from "react";
import Progress from "./Progress";

const LanguageInfo = ({ language, progress, accentColor, bgColor }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[12px] font-semibold">{language}</p>
      {progress > 0 && (
        <Progress
          progress={(progress / 100) * 5}
          color={accentColor}
          bgColor={bgColor}
        />
      )}
    </div>
  );
};

const LanguageSection = ({ languages = [], accentColor, bgColor }) => {
  if (!Array.isArray(languages)) {
    console.warn("Invalid languages prop:", languages);
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      {languages.map((language, index) => (
        <LanguageInfo
          key={language?.name ? `${language.name}_${index}` : index}
          language={language?.name || "Unknown"}
          progress={language?.progress || 0}
          accentColor={accentColor}
          bgColor={bgColor}
        />
      ))}
    </div>
  );
};

export default LanguageSection;
