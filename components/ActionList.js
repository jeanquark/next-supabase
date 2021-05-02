import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/initSupabase'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from '@supabase/ui'
import Moment from 'react-moment'
import { Grid, TextField, Button, Paper, Box } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    },
    button: {
        verticalAlign: 'text-top',
        '&:hover': {
            color: '#000',
            cursor: 'pointer',
        },
    },
}))

export default function Messages() {
    const router = useRouter()
    const classes = useStyles()
    const { id } = router.query
    const { user, session } = Auth.useUser()
    const [action, setAction] = useState('')
    const [actions, setActions] = useState([])
    const [newAction, handleNewAction] = useState('')
    const [deletedMessage, handleDeletedMessage] = useState('')
    const [error, setError] = useState('')
    const actionsEndRef = useRef(null)
    let mySubscription = null
    // const [hovered, setHovered] = useState(false)
    useEffect(() => {
        if (newAction) {
            // console.log("newMessage :>> ", newMessage);
            console.log('newAction: ', newAction)
            setActions((a) => [...a, newAction])
            scrollToBottom()
        }
    }, [newAction])


    const getInitialActions = async () => {
        if (!actions.length) {
            const { data, error } = await supabase.from(`event_actions`).select(`id, number_participants, participation_threshold, events (home_team_name, visitor_team_name), actions (name), users (id, full_name)`).eq('event_id', id).order('id', { ascending: true })
            if (error) {
                setError(error.message)
                supabase.removeSubscription(mySubscription)
                mySubscription = null
                return
            }
            setActions(data)
        }
    }
    const getActionsAndSubscribe = async () => {
        setError('')
        getInitialActions()
        console.log('getActionsAndSubscribe')
        if (!mySubscription) {
            mySubscription = supabase
                .from(`event_actions:event_id=eq.${id}`)
                .on('INSERT', (payload) => {
                    console.log('getActionsAndSubscribe payload: ', payload)
                    handleNewAction(payload.new)
                })
                // .select(`id, events (home_team_name, visitor_team_name), actions (name), users (id, full_name)`)
                .subscribe()
        } else {
            console.log('Delete message')
        }
    }
    useEffect(() => {
        // console.log("useSupabase() effect ran!");
        getActionsAndSubscribe()
        return () => {
            supabase.removeSubscription()
            console.log('Remove supabase subscription by useEffect unmount')
        }
    }, [id])

    const scrollToBottom = () => {
        console.log('scrollToBottom')
        actionsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const joinAction = async (actionId) => {
        console.log('joinAction: ', actionId)
        // const { data, error } = await supabase
        //     .from(`event_actions:event_id=eq.${id}`)
        //     .update({ name: 'Middle Earth' })
        //     .match({ name: 'Auckland' })

        const { data, error } = await supabase
            .rpc('increment_participation_count_by_one', { row_id: parseInt(actionId) })
        if (error) {
            console.log('error: ', error)
            setError(error.message)
            return
        }
        console.log('data: ', data)
    }

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Actions:</h1>
            <br />
            <Box style={{ maxHeight: '250px', overflow: 'auto' }}>
                {actions.map((action) => (
                    <Box key={action.id}>
                        <Paper elevation={3} style={{ margin: 10, padding: 8 }}>
                            Action <i>{action.actions?.name}</i> on event <i>{action.events?.home_team_name} - {action.events?.visitor_team_name}</i> by user <i>{action.users?.id}</i> Participants: {action.number_participants} <button onClick={() => joinAction(action.id)}>Participate</button>
                        </Paper>
                    </Box>
                ))}
                <div ref={actionsEndRef} />
            </Box>
        </>
    )
}
