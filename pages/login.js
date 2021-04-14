import { useRouter } from "next/router";
import Link from 'next/link'

export default function Form() {
	const router = useRouter();
	const signInUser = async (event) => {
		try {
			console.log('signInUser: ', event)
			event.preventDefault();

			const res = await fetch(`/api/login`, {
				body: JSON.stringify({
					email: event.target.email.value,
					password: event.target.password.value,
				}),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});

			const { user } = await res.json();
			if (user) router.push(`/protected`);
		} catch (error) {
			console.log('error: ', error)
			// alert('Error')
		}
	};

	return (
		<>
			<Link href="/">
				<a>&larr; Home</a>
			</Link>
			<h3>Login</h3>
			<form onSubmit={signInUser}>
				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					type="email"
					autoComplete="email"
					required
				/>
				<label htmlFor="password">Password</label>

				<input
					type="password"
					id="password"
					name="password"
					required
				/>
				<button type="submit">Login</button>
			</form>
		</>
	);
}