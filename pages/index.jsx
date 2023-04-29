import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/home.module.css';

const apiKey = process.env.API_KEY;
const apiURL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;

const getTodaysDate = () => {
  const today = new Date();
  return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
};


export default function Home() {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const todaysDate = getTodaysDate();
    const storedRecipe = JSON.parse(localStorage.getItem('recipeOfTheDay'));

    if (storedRecipe && storedRecipe.date === todaysDate) {
      setRecipe(storedRecipe.recipe);
    } else {
      fetch(apiURL)
        .then((res) => res.json())
        .then((data) => {
          setRecipe(data);
          localStorage.setItem('recipeOfTheDay', JSON.stringify({ recipe: data, date: todaysDate }));
        })
        .catch((error) => setError(error.message));
    }
  }, []);



  return (
    <>
      <Head>
        <title>Foodie</title>
        <meta name="description" content="Foodie is a recipe-finding app." />
        <link rel="icon" href="web_icon.png" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/profile">
              <img src="/accnt_icon.png" alt="Profile" className={styles.icon} />
          </Link>
        </header>

        <main className={styles.main}>
          <div className={styles.recipeOfTheDay}>
            <h2 className={styles.recipeOfTheDayTitle}>Recipe of the Day</h2>
            {error && <p>{error}</p>}
            {recipe && (
              <Link href={`/recipes/${recipe.id}`}>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className={styles.recipeImage}
                />                  
                <h3 className={styles.recipeTitle}>{recipe.title}</h3>
              </Link>
            )}
          </div>

          <Link href="/recipes" className={styles.searchButton}>Search Recipes</Link>
        </main>
      </div>
    </>
  );
}



  /*
  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    getRecipe(); // Get the initial recipe

    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      if (hours === 0 && minutes === 0 && seconds === 0) {
        getRecipe();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  */






/*
import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/home.module.css'

const apiKey = process.env.API_KEY;
const apiURL = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;

export default function Home() {
    return (
      <>
        <Head>
           <title>Foodie</title>
           <meta name="description" content="Foodie is a recipe-finding app." />
           <link rel="icon" href="web_icon.png"/>
        </Head>

        <main>
            <div>
            <h1>Welcome to Foodie</h1>
            <Link href="/recipes" className="button">View Recipes</Link>
            </div>
        </main>
      </>
    )

}
*/
