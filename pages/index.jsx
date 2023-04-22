import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/home.module.css'


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
            <h1>Welcome to Foodie</h1>;
            <Link href="/recipes"><a>View Recipes</a></Link>
            </div>
        </main>
      </>
    )

}
