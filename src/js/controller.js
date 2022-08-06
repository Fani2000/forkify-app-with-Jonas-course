import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  getSearchResultsPage,
  loadRecipe,
  updateServings,
  loadSearchResults,
  state,
  addBookmark,
  deleteBookmark,
} from './model';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

if (module.hot) module.hot.accept();

const recipeController = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(getSearchResultsPage());
    bookmarksView.update(state.bookmarks);

    await loadRecipe(id);

    // 2. Rendering the recipe
    recipeView.render(state.recipe);

    // // Test
    // servingsController();
  } catch (e) {
    // alert(e);
    recipeView.renderError(e.message);
  }
};

const searchedRecipeController = async () => {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();

    if (!query) return;

    await loadSearchResults(query);
    // console.log(state.search);
    resultsView.render(getSearchResultsPage());

    paginationView.render(state.search);
  } catch (e) {
    console.log(e);
  }
};

const paginationController = goto => {
  console.log(goto);
  resultsView.render(getSearchResultsPage(goto));

  paginationView.render(state.search);
};

recipeView.renderMessage(
  'Start by searching for a recipe or an ingredient. Have fun!'
);

const servingsController = newServings => {
  // update the recipe servings (in the state)
  updateServings(newServings);
  // update the recipe view
  // recipeView.render(state.recipe);
  recipeView.update(state.recipe);
};

const addBookmarkController = () => {
  if (!state.recipe.bookmarked) addBookmark(state.recipe);
  else deleteBookmark(state.recipe.id);

  // console.log(state.recipe);
  recipeView.render(state.recipe);

  // render the books
  bookmarksView.render(state.bookmarks);
};

const init = () => {
  searchView.addHandlerSearch(searchedRecipeController);
  paginationView.addHandlerClick(paginationController);
  recipeView.addHandlerRender(recipeController);
  recipeView.addHandlerUpdateServings(servingsController);
  recipeView.addHandlerAddBookmark(addBookmarkController);
};

init();
