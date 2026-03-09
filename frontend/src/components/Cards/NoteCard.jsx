import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded bg-white hover:shadow-xl p-4 transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${
            isPinned ? "text-primary" : "text-slate-300"
          }`}
          onClick={onPinNote}
        />
      </div>

      {/* Content */}
      <p className="text-sm text-slate-500">
        {content?.slice(0, 60)}
        {content?.length > 60 ? "..." : ""}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {Array.isArray(tags) ? tags.join(", ") : ""}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;