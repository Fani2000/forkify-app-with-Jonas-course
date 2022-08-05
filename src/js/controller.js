import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { loadRecipe, state } from './model';
import recipeView from './views/revipeView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const recipeController = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    await loadRecipe(id);

    // 2. Rendering the recipe
    recipeView.render(state.recipe);
  } catch (e) {
    alert(e);
  }
};

const init = () => {
  recipeView.addHandlerRender(recipeController);
};

init();
