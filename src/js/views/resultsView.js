import View from './view.js';

import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe results found :)';
  _message = '';

  _generateMarkup = () => {
    return this._data.map(this._generateMarkupPreview).join('');
  };
  _generateMarkupPreview = preview => {
    const id = window.location.hash.slice(1);

    return `
          <li class="preview">
            <a class="preview__link ${
              preview.id === id ? 'preview__link--active' : ''
            }" href="#${preview.id}">
              <figure class="preview__fig">
                <img src="${preview.image}" alt="${preview.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${preview.title}</h4>
                <p class="preview__publisher">${preview.publisher}</p>
              </div>
            </a>
          </li>
    `;
  };
}

export default new ResultsView();

//  preview__link--active

// <div class="preview__user-generated">
//   <svg>
//     <use href="${icons}#icon-user"></use>
//   </svg>
// </div>
