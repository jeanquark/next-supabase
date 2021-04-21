import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/initSupabase'
import { Auth } from '@supabase/ui'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import EventDetails from '../../components/EventDetails'
import MessageList from '../../components/MessageList'
import { Container, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    }
}))

const Event = () => {
    const router = useRouter()
    const { id } = router.query
    const classes = useStyles()
    const [event, setEvent] = useState([])
    const greeting = {
        id: 1,
        message: 'Welcome to React'
    }

    useEffect(() => {
        fetchEvent(id);
    }, [id])

    const fetchEvent = async (id) => {
        let { data: event, error } = await supabase.from('events').select('*').eq('id', id)
        if (error) {
            console.log('error', error)
        }
        else {
            console.log('event[0]: ', event[0])
            setEvent(event[0])
        }
    }

    return (
        // <div>
        //     <p>Event id: {id}</p>
        //     <Link href="/">
        //         <a>&larr; Homepage</a>
        //     </Link>
        //     <div style={{ margin: '20px', padding: '0px 20px 20px 20px', border: '1px solid grey'}}>
        //         <h3>Event</h3>
        //         <b>{event.home_team_name}</b>&nbsp;-&nbsp;
        //         <b>{event.visitor_team_name}</b>&nbsp;&nbsp;&nbsp;
        //         <b>{event.home_team_score}:{event.visitor_team_score}</b>
        //         <span style={{ marginLeft: '10px'}}>{event.venue},</span>
        //         <span style={{ marginLeft: '10px'}}>{event.city},</span>
        //         <span style={{ marginLeft: '10px'}}><Moment format="ddd Do MMM YYYY HH:mm">{event.date}</Moment></span>
        //     </div>

        //     <EventDetails />

        //     <MessageList />
        // </div>

        <Container className={classes.container}>
            <Link href="/">
                <a>Home</a>
            </Link>
            <br />
            <Link href="/fixtures">
                <a>Fixtures</a>
            </Link>
            <p>Event id: {id}</p>
            <p>Event id: {event.id}</p>
            <br />
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6}>
                    <EventDetails event={event} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <MessageList />
                </Grid>
            </Grid>
        </Container>

    )
}

export default Event