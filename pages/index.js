import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import styles from '../styles/Home.module.css'
import PostList from '../components/PostList'
import EventList from '../components/EventList'

export default function Home() {
	const router = useRouter();
	const [isAuthed, setAuthStatus] = useState(false);
	useEffect(() => {
		fetch("/api/getUser")
			.then((response) => response.json())
			.then((result) => {
				setAuthStatus(result.user && result.user.role === "authenticated");
			});
	}, []);

	const signOutUser = async () => {
		const res = await fetch(`/api/logout`);
		if (res.status === 200) setAuthStatus(false);
		// redirect to homepage when logging out users
		if (window.location !== "/") router.push("/");
	};

	return (
		<div>
			<Head>
				<title>Home - Next Supabase</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h2>Welcome to Next Supabase!</h2>
				<div>
					<Link href="/api/api-football/fetch-next-fixtures"><a>Fetch next fixtures</a></Link>&nbsp;|&nbsp;
					<Link href="/about"><a>About</a></Link>&nbsp;|&nbsp;
					<Link href="/protected"><a>Protected</a></Link>&nbsp;|&nbsp;

					{isAuthed ? (
						<>
							<span onClick={signOutUser}>
								<p>Sign Out</p>
							</span>
						</>
					) : (
						// If there is no authenticated user then we will link to the Sign-in and Sign Up pages
						<>
							<Link href="/signup">
								<a>Sign Up</a>
							</Link>&nbsp;|&nbsp;
							<Link href="/login">
								<a>Login</a>
							</Link>&nbsp;|&nbsp;
						</>
					)}
				</div>


				<PostList />
				<EventList />
			</main>

			<footer className={styles.footer}>
			</footer>
		</div>
	)
}
