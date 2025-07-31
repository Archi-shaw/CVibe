import React from 'react';

const ActionLink = ({ icon, link, bgColor }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-[25px] h-[25px] flex items-center justify-center rounded-full"
        style={{ backgroundColor: bgColor }}
      >
        {icon}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[13px] font-medium underline cursor-pointer break-all"
      >
        {link}
      </a>
    </div>
  );
};

export default ActionLink;
