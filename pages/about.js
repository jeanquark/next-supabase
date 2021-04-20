import React from 'react';
import useSWR from 'swr'
import { Auth } from '@supabase/ui'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Your Website
      </Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	button: {
		background: '#3C5A99',
		borderRadius: 3,
		border: 0,
		color: 'white',
		height: 38,
		padding: '0 30px',
	  },
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const signInUser = async (event) => {
	try {
		event.preventDefault()
		console.log('signInUser: ', event)

		// let { user, error } = await supabase.auth.signIn({
		// 	email: event.target.email.value,
		// 	password: event.target.password.value,
		// });
		// if (error) {
		// 	return res.status(401).json({ error: error.message });
		// }
		// console.log('user: ', user)
	} catch (error) {
		console.log('error: ', error)
	}
}

async function googleOAuthHandler() {
	console.log('googleOAuthHandler')
	const { user, session, error } = await supabase.auth.signIn({
		provider: 'google',
	})
	console.log('user: ', user)
	console.log('session: ', session)
	console.log('error: ', error)
}

const fetcher = (url, token) => fetch(url, {
	method: 'GET',
	headers: new Headers({ 'Content-Type': 'application/json', token }),
	credentials: 'same-origin',
}).then((res) => res.json())

export default function about() {
	const classes = useStyles();
	const { user, session } = Auth.useUser()

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

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image}>
				<h3>abc</h3>
				<p>User: {user?.email}</p>
			</Grid>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
          			</Typography>
					<form className={classes.form} noValidate onSubmit={signInUser}>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
            			</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
                				</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<Grid style={{ marginTop: 20 }}>
							<Button variant="contained" fullWidth classes={{ root: classes.button }} onClick={googleOAuthHandler}>
								Google login
							</Button>
						</Grid>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}