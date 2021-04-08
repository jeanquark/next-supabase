import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import PostList from '../components/PostList'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Home - Next Supabase</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h2>Welcome to Next Supabase!</h2>
				<Link href="/about"><a>About</a></Link>
				<PostList />
			</main>

			<footer className={styles.footer}>
			</footer>
		</div>
	)
}
