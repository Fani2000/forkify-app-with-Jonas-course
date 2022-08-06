import View from './view';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarkers yet, find a nice recipe and bookmark it :)';
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

export default new BookmarksView();
//  <li class="preview">
//                     <a class="preview__link" href="#23456">
//                       <figure class="preview__fig">
//                         <img src="src/img/test-1.jpg" alt="Test" />
//                       </figure>
//                       <div class="preview__data">
//                         <h4 class="preview__name">
//                           Pasta with Tomato Cream ...
//                         </h4>
//                         <p class="preview__publisher">The Pioneer Woman</p>
//                       </div>
//                     </a>
//                   </li>
