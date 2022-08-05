// State for the recipe
export const state = {
  recipe: {},
};

// Load the recipe and then update the state for recipe
export const loadRecipe = async id => {
  try {
    const url = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(res, data);
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

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
    alert(error);
  }
};
