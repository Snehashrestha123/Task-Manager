// import React from "react";
// import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
// import moment from "moment"

// const NoteCard = ({
//   title,
//   date,
//   content,
//   tags,
//   isPinned,
//   onEdit,
//   onDelete,
//   onPinNote,
// }) => {
//   return (
//     <div className="border rounded bg-white hover:shadow-xl p-4 transition-all ease-in-out">
//       <div className="flex items-center justify-between">
//         <div>
//           <h6 className="text-sm font-medium">{title}</h6>
//           <span className="text-xs text-slate-500">{moment(date).format("DD MMM, YYYY")}</span>
//         </div>
//         <MdOutlinePushPin
//           className={`icon-btn ${
//             isPinned ? "text-primary" : "text-slate-300"
//           }`}
//           onClick={onPinNote}
//         />
//       </div>

//       {/* Content */}
//       <p className="text-sm text-slate-500">
//         {content?.slice(0, 60)}
//         {content?.length > 60 ? "..." : ""}
//       </p>

//       {/* Footer */}
//       <div className="flex items-center justify-between mt-2">
//         <div className="text-xs text-slate-500">{tags.map((item)=> '#${item')}</div>
//         <div className="flex items-center gap-2">
//           <MdCreate
//             className="icon-btn hover:text-green-600"
//             onClick={onEdit}
//           />
//           <MdDelete
//             className="icon-btn hover:text-red-500"
//             onClick={onDelete}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;


import React from "react";
import { MdEdit, MdDelete, MdPushPin } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  _id,
  title,
  content,
  tags,
  date,
  isPinned,
  onEdit,
  onDelete, // This now receives the _id when clicked
  onPinNote,
}) => {
  const handleDelete = () => {
    onDelete(_id); // Pass note ID to parent for deletion
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative flex flex-col gap-3">
      {/* Pin Icon */}
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        onClick={onPinNote}
      >
        <MdPushPin size={20} className={isPinned ? "text-yellow-500" : ""} />
      </button>

      {/* Title */}
      <h2 className="text-xl font-bold">{title}</h2>

      {/* Content */}
      <p className="text-gray-700">{content}</p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Date */}
      <p className="text-gray-400 text-xs mt-2">
        {moment(date).format("DD MMM, YYYY")}
      </p>

      {/* Actions */}
      <div className="absolute bottom-2 right-2 flex gap-2">
        <button onClick={onEdit} className="text-gray-400 hover:text-gray-600">
          <MdEdit size={18} />
        </button>
        <button onClick={handleDelete} className="text-gray-400 hover:text-gray-600">
          <MdDelete size={18} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;