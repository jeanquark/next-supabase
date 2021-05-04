import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/initSupabase'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from '@supabase/ui'
import Countdown from 'react-countdown'
import Moment from 'react-moment'
import { Grid, TextField, Button, Paper, Box } from '@material-ui/core'

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
    const [updateAction, handleUpdateAction] = useState('')
    const [deleteAction, handleDeleteAction] = useState('')
    const [error, setError] = useState('')
    const actionsEndRef = useRef(null)
    let mySubscription = null

    useEffect(() => {
        console.log('[useEffect] id: ', id)
        if (id != undefined) {
            getActionsAndSubscribe(id)
        }
        return async () => {
            const { data } = await supabase.removeSubscription(mySubscription)
            // Remove user from event
            await supabase
                .from('user_event')
                .upsert(
                    { user_id: 1, event_id: null },
                    { onConflict: 'user_id' }
                )
            console.log('Remove supabase subscription by useEffect unmount. data: ', data)
        }
    }, [id])

    useEffect(() => {
        console.log('[useEffect] newAction: ', newAction)
        if (newAction) {
            setActions((a) => [...a, newAction])
            scrollToBottom()
        }
    }, [newAction])

    useEffect(() => {
        try {
            console.log('[useEffect] updateAction: ', updateAction)
            console.log('actions: ', actions)
            if (updateAction) {
                const index = actions.findIndex((a) => a.id == updateAction.id)
                console.log('index: ', index)
                let newActions = [...actions]
                newActions[index]['number_participants'] = updateAction.number_participants
                newActions[index]['is_completed'] = updateAction.is_completed
                setActions(newActions)
            }
        } catch (error) {
            console.log('error: ', error)
        }
    }, [updateAction])

    useEffect(() => {
        console.log('[useEffect] deleteAction: ', deleteAction)
        if (deleteAction) {
            setActions(actions.filter(a => a.id !== deleteAction.id))
        }
    }, [deleteAction])
    

    const onCountdownComplete = (action) => {
        console.log('onCountdownComplete: ', action)
        // Delete from store
        handleDeleteAction(action)
    }

    const getInitialActions = async (id) => {
        console.log('getInitialActions')
        if (!actions.length) {
            const { data, error } = await supabase
                .from(`event_actions`)
                .select(`id, number_participants, participation_threshold, is_completed, expired_at, events (home_team_name, visitor_team_name), actions (name), users (id, full_name)`)
                .eq('event_id', id)
                .order('id', { ascending: true })
            if (error) {
                setError(error.message)
                supabase.removeSubscription(mySubscription)
                mySubscription = null
                return
            }
            setActions(data)
            
            // Add user to event
            await supabase
                .from('user_event')
                .upsert(
                    { user_id: 1, event_id: id },
                    { onConflict: 'user_id' }
                )
        }
    }
    const getActionsAndSubscribe = async (id) => {
        console.log('getActionsAndSubscribe')
        setError('')
        getInitialActions(id)
        if (!mySubscription) {
            mySubscription = supabase
                .from(`event_actions:event_id=eq.${id}`)
                .on('INSERT', (payload) => {
                    console.log('INSERT')
                    handleNewAction(payload.new)
                    // handleCreateAction(payload.new)
                })
                .on('UPDATE', (payload) => {
                    console.log('UPDATE')
                    handleUpdateAction(payload.new)
                })
                .subscribe()
        } else {
            supabase.removeSubscription(mySubscription)
            console.log('Delete message')
        }
    }

    const scrollToBottom = () => {
        console.log('scrollToBottom')
        actionsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const createAction = async () => {
        console.log('createAction')
        const { data, error } = await supabase.from('event_actions').insert([{ event_id: 4, user_id: 1, action_id: 2, participation_threshold: 10 }])

        if (error) {
            alert(error.message)
            return
        }
        console.log('Successfully created action!')
    }
    const joinAction = async (actionId) => {
        console.log('joinAction: ', actionId)

        const { data, error } = await supabase.rpc('increment_participation_count_by_one', { row_id: parseInt(actionId) })
        // const { data, error } = await supabase
        //     .from('event_actions')
        //     .update({ number_participants: 3 })
        //     .filter('id', 'eq', actionId)
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
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                    createAction()
                }}
            >
                Create new action
            </Button>
            <br />
            <Countdown date={Date.now() + 10000} onComplete={() => onCountdownComplete()} />
            <br />
            <Box style={{ maxHeight: '250px', overflow: 'auto' }}>
                {actions.map((action) => (
                    <Box key={action.id}>
                        <Paper elevation={3} style={{ margin: 10, padding: 8 }}>
                            Action <i>{action.actions?.name}</i> on event{' '}
                            <i>
                                {action.events?.home_team_name} - {action.events?.visitor_team_name}
                            </i>{' '}
                            by user <i>{action.users?.id}</i> Participants: {action.number_participants} isCompleted? {action.is_completed ? 'Yes' : 'No'} expiredAt: {action.expired_at} expiresIn: <Countdown date={action.expired_at} onComplete={() => onCountdownComplete(action)} />&nbsp;
                            <button onClick={() => joinAction(action.id)}>Participate</button>
                        </Paper>
                    </Box>
                ))}
                <div ref={actionsEndRef} />
            </Box>
        </>
    )
}
