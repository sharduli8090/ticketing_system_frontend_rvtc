import PropTypes from "prop-types";
import { IoCloseOutline } from "react-icons/io5";

const ApproveDenyComments = ({
  isOpen,
  closeCommentModal,
  handleApproveDeny,
  ticketStatus,
  ticketComments,
  setTicketComments,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
        <div className="relative bg-gray-950 text-gray-50 rounded-lg p-10 glow-login lg:hidden md:block">
          {" "}
          <button
            className="absolute top-0 right-0 p-2"
            onClick={closeCommentModal}
          >
            <IoCloseOutline className="h-6 w-6 text-gray-300 transition-transform transform hover:scale-150 hover:rotate-180 hover:cursor-pointer duration-1000 hover:text-gray-50  rounded-full " />
          </button>
          Open in Desktop View
        </div>
        <div className="relative bg-gray-950 text-gray-50 rounded-lg p-10 glow-login lg:block md:hidden hidden">
          <button
            className="absolute top-0 right-0 p-2"
            onClick={closeCommentModal}
          >
            <IoCloseOutline className="h-6 w-6 text-gray-300 transition-transform transform hover:scale-150 hover:rotate-180 hover:cursor-pointer duration-1000 hover:text-gray-50  rounded-full " />
          </button>
          <h2 className="text-xl font-medium mb-4">
            Comments for{" "}
            {ticketStatus.charAt(0).toUpperCase() + ticketStatus.slice(1)}{" "}
            Ticket
          </h2>
          <textarea
            className="w-full border rounded px-3 py-2 mb-4 glow-input "
            rows="5"
            placeholder="Enter comments"
            value={ticketComments}
            onChange={(e) => setTicketComments(e.target.value)}
          />
          <button
            onClick={handleApproveDeny}
            className=" glow-button-purple text-gray-50 py-2 px-4 rounded   transition-all transform hover:scale-110 duration-1000"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

ApproveDenyComments.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeCommentModal: PropTypes.func.isRequired,
  handleApproveDeny: PropTypes.func.isRequired,
  ticketStatus: PropTypes.string.isRequired,
  ticketComments: PropTypes.string.isRequired,
  setTicketComments: PropTypes.func.isRequired,
};

export default ApproveDenyComments;
