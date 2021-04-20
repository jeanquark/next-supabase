import Link from 'next/link'
import useSWR from 'swr'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'
import { useUser } from '../store/user-context'


const fetcher = (url, token) =>
	fetch(url, {
		method: 'GET',
		headers: new Headers({ 'Content-Type': 'application/json', token }),
		credentials: 'same-origin',
	}).then((res) => res.json())

const Test = () => {
	const { user, session } = useUser()
	const { data, error } = useSWR(session ? ['/api/getUser', session.access_token] : null, fetcher)
	const [authView, setAuthView] = useState('sign_in')

	useEffect(() => {
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'PASSWORD_RECOVERY') setAuthView('update_password')
			if (event === 'USER_UPDATED') setTimeout(() => setAuthView('sign_in'), 1000)
			// Send session to /api/auth route to set the auth cookie.
			// NOTE: this is only needed if you're doing SSR (getServerSideProps)!
			fetch('/api/auth', {
				method: 'POST',
				headers: new Headers({ 'Content-Type': 'application/json' }),
				credentials: 'same-origin',
				body: JSON.stringify({ event, session }),
			}).then((res) => res.json())
		})

		return () => {
			authListener.unsubscribe()
		}
	}, [])

	if (!user) {
		return (
			<>
				<p>Not connected.</p>
				<Link href="/"><a>&larr; Home</a></Link>
			</>
		)
	}
	return (
		<>
			<p>Connected</p>
			<p>Email: {user?.email}</p>
			<Link href="/"><a>&larr; Home</a></Link>
		</>
	)
}

export default Test
