import React from 'react'

const TemplateCard = ({ thumbnailing, isSelected, onSelect }) => {
    return (
        <div
            className={`h-auto md:h-[300px] flex flex-col items-center  gap-5 justify-between m_bg ${isSelected ? "m-border-purple-500 border-2" : ""}`}
            onClick={onSelect}
        > 
            {thumbnailing ? (
                <img src={thumbnailing} alt="" className="w-[100%] rounded" />
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default TemplateCard;
