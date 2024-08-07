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
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="relative bg-white rounded-lg p-10">
          <button
            className="absolute top-0 right-0 p-2"
            onClick={closeCommentModal}
          >
            <IoCloseOutline className="h-6 w-6 text-gray-600 transition-transform transform hover:scale-150 hover:rotate-180 hover:cursor-pointer duration-1000 hover:text-gray-900 hover:bg-gray-100 rounded-full" />
          </button>
          <h2 className="text-xl font-bold mb-4">
            {ticketStatus.charAt(0).toUpperCase() + ticketStatus.slice(1)}{" "}
            Ticket
          </h2>
          <textarea
            className="w-full border rounded px-3 py-2 mb-4"
            rows="5"
            placeholder="Enter comments"
            value={ticketComments}
            onChange={(e) => setTicketComments(e.target.value)}
          />
          <button
            onClick={handleApproveDeny}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-transform transform hover:scale-110 duration-800"
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
