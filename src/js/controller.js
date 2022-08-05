import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { loadRecipe, loadSearchResults, state } from './model';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// https://forkify-api.herokuapp.com/v2

if (module.hot) module.hot.accept();

const recipeController = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    await loadRecipe(id);

    // 2. Rendering the recipe
    recipeView.render(state.recipe);
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
    console.log(state.search);
    resultsView.render(state.search.results);
  } catch (e) {
    console.log(e);
  }
};

recipeView.renderMessage(
  'Start by searching for a recipe or an ingredient. Have fun!'
);

const init = () => {
  searchView.addHandlerSearch(searchedRecipeController);
  recipeView.addHandlerRender(recipeController);
};

init();
