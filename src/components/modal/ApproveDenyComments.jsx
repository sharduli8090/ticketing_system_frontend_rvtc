import PropTypes from 'prop-types';
// import { useState } from 'react';

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
        <div className="relative bg-white rounded-lg p-8">
          <button
            className="absolute top-0 right-0 p-2"
            onClick={closeCommentModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-xl font-bold mb-4">
            {ticketStatus.charAt(0).toUpperCase() + ticketStatus.slice(1)} Ticket
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
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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
