import styles from './style.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        ©Foodie 2023. All rights reserved. <br></br>
        Made Using the <a href="https://spoonacular.com/food-api/">Spoonacular API</a> for educational purposes only.
      </p>
    </footer>
  );
};

export default Footer;