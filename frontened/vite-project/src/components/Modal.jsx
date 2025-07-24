// import React from 'react';

// const Modal = ({
//   children,
//   isOpen,
//   onClose,
//   title,
//   hideHeader,
//   showActionBtn,
//   actionBtnText,
//   actionBtnIcon,
//   onActionClick
// }) => {
//   if (!isOpen) return null;

//   return (
// <div className="fixed inset-0 z-50 flex justify-center items-center bg-transparent bg-opacity-30 backdrop-blur-sm">
//       <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-[90%] max-w-lg max-h-[90vh]">
        
//   <button
//           type="button"
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
//         >              <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//         {/* Header */}
//         {!hideHeader && (
//           <div className="flex items-center justify-between p-4 border-b">
//             <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//           </div>
//         )}

//         {/* Body */}
//         <div className="p-4 overflow-y-auto">
//           {children}
//         </div>

//         {/* Action Button */}
//         {/* {showActionBtn && (
//           <div className="p-4 border-t flex justify-end">
//             <button
//               onClick={onActionClick}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
//             >
//               {actionBtnIcon && <span>{actionBtnIcon}</span>}
//               <span>{actionBtnText}</span>
//             </button>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Modal;


import React from 'react';

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader,
  showActionBtn,
  actionBtnText,
  actionBtnIcon,
  onActionClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-transparent bg-opacity-30 backdrop-blur-sm p-2 sm:p-4">
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md max-h-[90vh] sm:max-w-lg md:max-w-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
        )}

        {/* Body */}
        <div className="p-4 overflow-y-auto">
          {children}
        </div>

        {/* Action Button */}
        {showActionBtn && (
          <div className="p-4 border-t flex justify-end">
            <button
              onClick={onActionClick}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 text-sm sm:text-base"
            >
              {actionBtnIcon && <span>{actionBtnIcon}</span>}
              <span>{actionBtnText}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;