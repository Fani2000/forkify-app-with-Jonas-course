import { getJSON } from './helpers';

// State for the recipe
export const state = {
  recipe: {},
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
    const data = await getJSON(url);

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
  } catch (error) {
    // alert(error);
    throw new Error("We couldn't find the recipe, Please try again later!");
  }
};

export const loadSearchResults = async query => {
  try {
    const url = `${process.env.API_URL}?search=${query}`;
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
