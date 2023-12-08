import PropTypes from 'prop-types';

const typeOfIngredientsData = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
});
const api = 'https://norma.nomoreparties.space/api/ingredients';


export { typeOfIngredientsData, api };