import { debounce, shuffle } from './util.js';

const RANDOM_PHOTO_QUANTITY = 10;
const TIMEOUT_DELAY = 500;

const FilterButtonsId = {
  DEFAULT_BUTTON: 'filter-default',
  RANDOM_BUTTON: 'filter-random',
  COMMENT_BUTTON: 'filter-discussed'
};

const filterContainer = document.querySelector('.img-filters');
const filterButtons = filterContainer.querySelectorAll('.img-filters__button');

const showFilterList = () => {
  filterContainer.classList.remove('img-filters--inactive');
};

const randomSort = (photoArray) => shuffle(photoArray.slice()).slice(0, RANDOM_PHOTO_QUANTITY);

const getCommentsQuantity = (photo) => {
  const commentsQuantity = photo.comments.length;
  return commentsQuantity;
};

const comparePhotosByComments = (photoA, photoB) => {
  const commentsQuantityA = getCommentsQuantity(photoA);
  const commentsQuantityB = getCommentsQuantity(photoB);
  return commentsQuantityB - commentsQuantityA;
};

const sortByComments = (photoArray) => photoArray.slice().sort(comparePhotosByComments);

const setFilterButtonClick = (cb, photoArray) => {
  filterContainer.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target.classList.contains('img-filters__button')) {
      filterButtons.forEach((element) => {
        element.classList.remove('img-filters__button--active');
      });
      target.classList.add('img-filters__button--active');
    }

    if (target.id === FilterButtonsId.DEFAULT_BUTTON) {
      cb(photoArray);
    }

    if (target.id === FilterButtonsId.RANDOM_BUTTON) {
      cb(randomSort(photoArray));
    }

    if (target.id === FilterButtonsId.COMMENT_BUTTON) {
      cb(sortByComments(photoArray));
    }
  });
};

const filterSwitch = (cb, photoArray) => {
  setFilterButtonClick(debounce(cb, TIMEOUT_DELAY), photoArray);
};

export { showFilterList, filterSwitch };
