import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ContronetArgCard = (props) => {
  const { moduleName, modelName, weight, deleteControlnetArg } = props;
  return (
    <div className="px-4 py-2.5 rounded-md bg-navLink relative">
      <div className="flex items-center gap-x-2 absolute top-2 right-2">
        <button
          className="p-2 text-xs rounded bg-red-700 text-white leading-none"
          onClick={deleteControlnetArg}
          type="button"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
      <span className="block mb-1.5">
        <strong>Weight:</strong> <span className="text-sm">{weight}</span>
      </span>
      <span className="block mb-1.5">
        <strong>Module:</strong> <span className="text-sm">{moduleName}</span>
      </span>
      <span className="block">
        <strong>Model:</strong> <span className="text-sm">{modelName}</span>
      </span>
    </div>
  );
};

export default ContronetArgCard;
