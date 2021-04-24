import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/initSupabase'
import { Auth } from '@supabase/ui'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import EventDetails from '../../components/EventDetails'
import MessageList from '../../components/MessageList'
import Navbar from '../../components/Navbar'
import { Container, Grid, AppBar, Toolbar, Box, Button, Typography, IconButton, Menu, MenuItem } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    link: {
        color: 'red',
        textDecoration: 'none',
    },
}))

const Event = () => {
    const router = useRouter()
    const { id } = router.query
    const classes = useStyles()
    const { user, session } = Auth.useUser()
    const [event, setEvent] = useState([])

    // useEffect(() => {
	// 	console.log('useEffect user.id: ', user?.id)
	// 	if (user) {
	// 		console.log('Redirect to /fixtures')
	// 	}
	// }, [])

    useEffect(() => {
        fetchEvent(id)
    }, [id])

    const fetchEvent = async (id) => {
        let { data: event, error } = await supabase.from('events').select('*').eq('id', id)
        if (error) {
            console.log('error', error)
        } else {
            console.log('event[0]: ', event[0])
            setEvent(event[0])
        }
    }

    async function logoutHandler(e) {
        console.log('e: ', e)
        const { error } = await supabase.auth.signOut()
        console.log('error: ', error)
    }

    return (
        <>
            <Navbar title={"Event"} links={['fixtures']} />

            <Container className={classes.container}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={6}>
                        <EventDetails event={event} />
                        user.id: {user?.id}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <MessageList />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Event
