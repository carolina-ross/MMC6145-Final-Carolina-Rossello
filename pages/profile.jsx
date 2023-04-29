import { useState, useEffect } from 'react';
import styles from '../styles/profile.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useLogout from '../mysql-auth/hooks/useLogout.js';

export default function Profile() {
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [photo, setPhoto] = useState('/accnt_icon.png')
  const [showSignUpForm, setShowSignUpForm] = useState(true)
  const [showSignInForm, setShowSignInForm] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [errors, setErrors] = useState({})
  const { isLoading, logout } = useLogout();
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Function to handle form submission
    const handleSignUpSubmit = (e) => {
    e.preventDefault()

    const errors = {}
    if (!userName.trim()) {
      errors.userName = 'User name is required'
    }
    if (!fullName.trim()) {
      errors.fullName = 'Full name is required'
    }
    if (!password.trim()) {
      errors.password = 'Password is required'
    }
    setErrors(errors)

    if (Object.keys(errors).length === 0) {
    // TODO: Save the user data to database or local storage
    setShowSignUpForm(false)
    setIsLoggedIn(true);
  }
};

  // Function to handle sign in
  const handleSignInSubmit = (e) => {
    e.preventDefault()

    const errors = {}
    if (!userName.trim()) {
      errors.userName = 'User name is required'
    }
    if (!password.trim()) {
      errors.password = 'Password is required'
    }
    setErrors(errors)

    if (Object.keys(errors).length === 0) {
      // TODO: Check user credentials and sign them in
      setShowSignInForm(false)
      setIsLoggedIn(true);
    }
  };
      
  // Function to handle photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhoto(reader.result)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    async function getUserData() {
      const res = await fetch('../../db/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        router.push('/login');
      }
    }

    getUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profile}>
      <div className={styles.message}>
        <h1>Hello {userName || 'User'}</h1>
      </div>
      {showSignUpForm ? (
        <form onSubmit={handleSignUpSubmit} className={styles.form}>
          <h2>Sign up to create profile</h2>
          <label>
            User Name:
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            {errors.userName && <p className={styles.error}>{errors.userName}</p>}
          </label>

          <label>
            Full Name:
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}
          </label>

          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </label>
          <button type="submit">Sign Up</button>
        </form>

      ) : (
        <>
          <div className={styles.profileInfo}>
            <div className={styles.photo}>
              <Image src={photo} alt={userName} width={200} height={200} />
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            </div>

            <div className={styles.userInfo}>
              <h2>{userName}</h2>
              <p>User ID: 123456</p>
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={styles.collectionButton} onClick={() => console.log('Go to collection page')}>Collections</button>
            <button className={styles.logoutButton} onClick={logout} disabled={isLoading}>{isLoading ? "Loading..." : "Log out"}</button>
          </div>
        </>
      )}

{isLoggedIn ? null : showSignInForm ? (
    // Sign in form
    <form onSubmit={handleSignInSubmit} className={styles.form}>
      <h2>Sign in to your account</h2>
      <label>
        User Name:
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Sign In</button>
    </form>
  ) : (
    // Sign in button
    <div>
      <p className={styles.memberText}>Already a member?</p>
      <button className={styles.signInButton} onClick={() => setShowSignInForm(true)}>Sign In</button>
    </div>
    )}
  </div>
  );
}

