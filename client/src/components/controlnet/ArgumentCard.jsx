import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ArgumentCard = (props) => {
  const {
    cardImg,
    deleteArgumentCard,
    weight,
    module,
    model,
    guidanceStart,
    guidanceEnd,
  } = props;
  return (
    <div className="bg-navLink p-3 rounded-md flex gap-x-2">
      <div className="w-2/6 rounded-md overflow-hidden bg-secondary basis-2/6 shrink-0 grow-0">
        <img
          src={cardImg}
          alt="Control Net Argument thumb"
          className="block max-w-full"
        />
      </div>
      <div className="w-4/6">
        <div className="px-4 py-2.5 rounded-md bg-navLink relative">
          <div className="flex items-center gap-x-2 absolute top-2 right-2">
            <button
              className="p-2 text-xs rounded bg-red-700 text-white leading-none"
              onClick={deleteArgumentCard}
              type="button"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>

          <span className="block mb-1.5">
            <strong>Weight:</strong> <span className="text-sm">{weight}</span>
          </span>
          <span className="block">
            <strong>Guidance Start:</strong>{" "}
            <span className="text-sm">{guidanceStart}</span>
          </span>
          <span className="block">
            <strong>Guidance End:</strong>{" "}
            <span className="text-sm">{guidanceEnd}</span>
          </span>
          <span className="block mb-1.5">
            <strong>Module:</strong> <span className="text-sm">{module}</span>
          </span>
          <span className="block mb-1.5">
            <strong>Model:</strong> <span className="text-sm">{model}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArgumentCard;
