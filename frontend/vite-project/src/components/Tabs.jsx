import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-neutral-800 text-sm">
      {tabs.map((tab, idx) => (
        <button
          key={idx}
          onClick={() => setActiveTab(tab.label)}
          className={`relative py-2.5 px-4.5 font-medium transition-all duration-300 ease-out border-b-2 ${
            activeTab === tab.label
              ? "border-purple-700 text-purple-400"
              : "border-transparent hover:border-neutral-600 text-neutral-400"
          }`}
        >
          {tab.label}
          {activeTab === tab.label && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/85 to-purple-700" />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
