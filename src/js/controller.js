import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { loadRecipe, state } from './model';
import recipeView from './views/revipeView.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const apiKey = process.env.API_KEY;

const recipeController = async () => {
  try {
    const id = window.location.hash.substring(1);

    if (!id) return;

    recipeView.renderSpinner();
    await loadRecipe(id);

    // 2. Rendering the recipe
    recipeView.render(state.recipe);
  } catch (e) {
    alert(e);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, recipeController)
);
