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
				<Link href="/about"><a>About &rarr;</a></Link>
				<PostList />
				<Link href="/events/1">
					<a>Event 1 &rarr;</a>
				</Link>
				<Link href="/events/2">
					<a>Event 2 &rarr;</a>
				</Link>
			</main>

			<footer className={styles.footer}>
			</footer>
		</div>
	)
}
