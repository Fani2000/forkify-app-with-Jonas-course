import View from './view.js';

import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup = () => {
    let curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.limit);
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
  <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
            </button>
      `;
    }
    // Other Page - middle page
    if (curPage < numPages) {
      return `
  <button  data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button  data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }

    // Page 1, and there are NO other pages
    return ``;
  };
  addHandlerClick = handler => {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      //   console.log(btn);
      if (!btn) return;

      handler(+btn.dataset.goto);
    });
  };
}

export default new PaginationView();
