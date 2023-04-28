import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/recipes.module.css';

const apiKey = process.env.API_KEY;

export default function Recipes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchTerm}&addRecipeInformation=true&number=1`;

    try {
      const response = await fetch(searchURL);
      const data = await response.json();
      if (data.results.length === 0) {
        setError(`No results found for '${searchTerm}'`);
        setRecipe(null);
      } else {
        setError(null);
        setRecipe(data.results[0]);
      }
    } catch (error) {
      setError('Oops, something went wrong');
      setRecipe(null);
    }
  };

  return (
    <>
      <Head>
        <title>Foodie - Recipes</title>
        <meta name="description" content="Search for delicious recipes." />
        <link rel="icon" href="/web_icon.png" />
      </Head>

      <div className={styles.container}>
      <header className={styles.header}>
          <Link href="/">
            <img src="/web_icon.png" alt="Foodie" className={styles.logo} />
          </Link>
          <Link href="/profile">
            <img src="/accnt_icon.png" alt="Profile" className={styles.icon} />
          </Link>
        </header>

        <main className={styles.main}>
          <form onSubmit={handleSubmit} className={styles.searchForm}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for recipes..."
              className={styles.searchBar}
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>

          {error && <p className={styles.errorMessage}>{error}</p>}
          {recipe && (
            <div className={styles.recipeCard}>
              <Link href={`/recipes/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
              </Link>
              <h3 className={styles.recipeTitle}>{recipe.title}</h3>
            </div>
          )}
        </main>
      </div>
    </>
  );
}


