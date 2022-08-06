import { getJSON } from './helpers';

// State for the recipe
export const state = {
  recipe: {},
  bookmarks: [],
  search: {
    query: '',
    results: [],
    page: 1,
    limit: 10,
  },
};

// Load the recipe and then update the state for recipe
export const loadRecipe = async id => {
  try {
    const url = `${process.env.API_URL}${id}`;
    const data = await getJSON(
      url || 'https://forkify-api.herokuapp.com/api/v2/recipes/' + id
    );

    let {
      data: { recipe },
    } = data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    state.recipe = recipe;

    if (state.bookmarks.some(b => b.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    // alert(error);
    throw new Error("We couldn't find the recipe, Please try again later!");
  }
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const loadSearchResults = async query => {
  try {
    state.search.page = 1;
    const url = `${
      process.env.API_URL || 'https://forkify-api.herokuapp.com/api/v2/recipes/'
    }?search=${query}`;
    const data = await getJSON(url);
    // console.log(data.data);
    let {
      data: { recipes },
    } = data;

    recipes = recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    state.search = {
      ...state.search,
      query,
      results: recipes,
    };
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (state.search.page - 1) * state.search.limit,
    end = state.search.page * state.search.limit;

  return state.search.results.slice(start, end);
};

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = recipe => {
  // Add Bookmark
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = id => {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

// console.log(state.bookmarks);
const clearBookmarks = () => {
  localStorage.clear('bookmarks');
};

init();
// clearBookmarks();
