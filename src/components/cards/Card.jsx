import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CardsComponent = ({ cards }) => {
  const navigate = useNavigate();

  const navigateToCard = (endpoint) => {
    navigate(endpoint);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950">
      <div className="flex-grow px-4 py-8 ">
        <div className="flex flex-col h-full justify-center items-center textf-white ">
          {cards.map((card) => (
            <div
              key={card.name}
              className={`transform transition-all  hover:scale-110 duration-1000 bg-black  hover:glow-button-purple  shadow-lg rounded mb-4 w-1/w2 w-full max-w-4xl glow-button-l`}
            >
              <div className="p-4 flex items-center justify-between ">
                <h3 className="text-white font-bold lg:text-2xl md:text-2xl text-lg ">
                  {card.name}
                </h3>
                <button
                  onClick={() => navigateToCard(card.endpoint)}
                  className=" text-white font-bold py-2 px-4 rounded shadow-md text-xs lg:text-lg md:text-md ml-10 transition-transform transform hover:scale-110 duration-1000  glow-button"
                >
                  {card.buttonText}
                </button>
              </div>
              <div className="px-4 py-2 text-sm lg:text-lg text-white   ">
                {card.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

CardsComponent.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      buttonText: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      endpoint: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CardsComponent;
