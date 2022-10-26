import PropTypes from "prop-types";

export const ingredientType = PropTypes.shape({
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
});

export default ingredientType;