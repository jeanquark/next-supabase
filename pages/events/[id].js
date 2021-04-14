import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/initSupabase'
import Link from 'next/link'
import MessageList from '../../components/MessageList'
import Moment from 'react-moment'

const Event = () => {
    const router = useRouter()
    const { id } = router.query
    const [event, setEvent] = useState([])

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
        <div>
            <p>Event id: {id}</p>
            <Link href="/">
                <a>&larr; Homepage</a>
            </Link>
            <div style={{ margin: '20px', padding: '0px 20px 20px 20px', border: '1px solid grey'}}>
                <h3>Event</h3>
                <b>{event.home_team_name}</b>&nbsp;-&nbsp;
                <b>{event.visitor_team_name}</b>&nbsp;&nbsp;&nbsp;
                <b>{event.home_team_score}:{event.visitor_team_score}</b>
                <span style={{ marginLeft: '10px'}}>{event.venue},</span>
                <span style={{ marginLeft: '10px'}}>{event.city},</span>
                <span style={{ marginLeft: '10px'}}><Moment format="ddd Do MMM YYYY HH:mm">{event.date}</Moment></span>
            </div>
            
            <MessageList />
        </div>
    )
}

export default Event