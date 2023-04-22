import styles from './style.module.css'
import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div>
        <Link href="web_icon.png"></Link>
        <Link href="/search">Search</Link>
      </div>
    </header>
  )
}