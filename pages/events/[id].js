import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/initSupabase'
import Link from 'next/link'

const Event = () => {
    const router = useRouter()
    const { id } = router.query
    const [event, setEvent] = useState([])

    useEffect(() => {
        fetchEvent(id);
    }, [])

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
        <>
            <p>Event id: {id}</p>
            <p>
                <b>{event.home_team_name}</b>&nbsp;-&nbsp; 
                <b>{event.visitor_team_name}</b>&nbsp;&nbsp;&nbsp;
                <b>{event.home_team_score}:{event.visitor_team_score}</b>
            </p>
            <Link href="/">
                <a>&larr; Homepage</a>
            </Link>
        </>
    )
}

export default Event