import Head from 'next/head'
import Link from 'next/link'

export default function About() {
	return (
		<div>
			<Head>
				<title>About - Next Supabase</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h2>About</h2>
				<Link href="/"><a>&larr; Homepage</a></Link>
			</main>
		</div>
	)
}
