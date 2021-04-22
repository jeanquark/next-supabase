import React from 'react'
import { supabase } from '../lib/initSupabase'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from '@supabase/ui'
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))

export default function ButtonAppBar(props) {
    const router = useRouter()
    const classes = useStyles()
    const { user, session } = Auth.useUser()

    async function loginHandler(e) {
        router.push('/')
    }
    async function logoutHandler(e) {
        const { error } = await supabase.auth.signOut()
        if (!error) {
            alert('You are logged out!')
        }
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.title}
                    </Typography>

                    {user ? (
                        <>
                            <Box mx={2}>Welcome, {user?.email}</Box>
                            {props.links?.map((link, index) => (
                                <Link href="/fixtures" passHref key={index}>
                                    <Button component="a" color="inherit">
                                        {link}
                                    </Button>
                                </Link>
                            ))}
                            <Button color="inherit" onClick={logoutHandler}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            {props.links?.map((link, index) => (
                                <Link href="/fixtures" passHref key={index}>
                                    <Button component="a" color="inherit">
                                        {link}
                                    </Button>
                                </Link>
                            ))}
                            <Button color="inherit" onClick={loginHandler}>
                                Login
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
