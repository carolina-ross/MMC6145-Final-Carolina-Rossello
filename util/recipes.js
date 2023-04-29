

export async function getRecipe(id) {

  const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`)
  if (response.status !== 200)
    return null
  const data = await response.json()
  return data
}

export async function searchRecipes(query) {
  

  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.API_KEY}&number=12`)
  if (response.status !== 200)
    return null
  const data = await response.json()
  return data.results
}