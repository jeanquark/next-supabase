import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/initSupabase'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from '@supabase/ui'
import Countdown from 'react-countdown'
import Moment from 'react-moment'
import { Grid, Typography, TextField, Button, Paper, Box } from '@material-ui/core'

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
    paper: {
        '&:hover': {
            cursor: 'pointer',
            background: theme.palette.primary.main,
            color: 'white'
        }
    }
}))

export default function Messages() {
    const router = useRouter()
    const classes = useStyles()
    const { id } = router.query
    const { user, session } = Auth.useUser()
    const [action, setAction] = useState('')
    const [actions, setActions] = useState([])
    const [tests, setTests] = useState([])
    const [eventActions, setEventActions] = useState([])
    const [eventUsers, setEventUsers] = useState([])
    const [newAction, handleNewAction] = useState('')
    const [updateAction, handleUpdateAction] = useState('')
    const [deleteAction, handleDeleteAction] = useState('')
    const [error, setError] = useState('')
    const actionsEndRef = useRef(null)
    let mySubscription = null

    useEffect(() => {
        console.log('[useEffect] getActionsAndSubscribe() id: ', id)
        if (id != undefined) {
            getActionsAndSubscribe(id)
        }
        return async () => {
            const { data } = await supabase.removeSubscription(mySubscription)
            // Remove user from event
            await supabase
                .from('event_users')
                .upsert(
                    { user_id: 1, event_id: null },
                    { onConflict: 'user_id' }
                )
            console.log('Remove supabase subscription by useEffect unmount. data: ', data)
        }
    }, [id])

    useEffect(() => {
        console.log('[useEffect] fetchActions()')
        fetchActions()
    }, [])

    // useEffect(() => {
    //     console.log('[useEffect] newAction: ', newAction)
    //     if (newAction) {
    //         setActions((a) => [...a, newAction])
    //         scrollToBottom()
    //     }
    // }, [newAction])

    // useEffect(() => {
    //     try {
    //         console.log('[useEffect] updateAction: ', updateAction)
    //         console.log('actions: ', actions)
    //         if (updateAction) {
    //             const index = actions.findIndex((a) => a.id == updateAction.id)
    //             console.log('index: ', index)
    //             let newActions = [...actions]
    //             newActions[index]['number_participants'] = updateAction.number_participants
    //             newActions[index]['is_completed'] = updateAction.is_completed
    //             setActions(newActions)
    //         }
    //     } catch (error) {
    //         console.log('error: ', error)
    //     }
    // }, [updateAction])

    // useEffect(() => {
    //     console.log('[useEffect] deleteAction: ', deleteAction)
    //     if (deleteAction) {
    //         setActions(actions.filter(a => a.id !== deleteAction.id))
    //     }
    // }, [deleteAction])

    const calculateParticipationThreshold = () => {
        console.log('calculateParticipationThreshold eventUsers: ', eventUsers)
        if (eventUsers.length < 2) {
            return 2
        }
        return eventUsers.length * 0.5
    }

    const fetchActions = async () => {
        const { data, error } = await supabase.from('actions').select('*').order('id', true)
        console.log('data: ', data)
        if (error) console.log('error: ', error)
        else setActions(data)
    }

    const onCountdownComplete = (action) => {
        console.log('onCountdownComplete() action: ', action)
        // Delete from store
        handleDeleteAction(action)
    }

    const getInitialActions = async (id) => {
        console.log('getInitialActions() id: ', id)
        if (!eventActions.length) {
            // 1) Retrieve event actions
            const { data: actions, error: errorActions } = await supabase
                .from(`event_actions`)
                .select('id, number_participants, participation_threshold, expired_at, actions (name), events (home_team_name, visitor_team_name), users (id, full_name)')
                // .select('*')
                .eq('event_id', id)
                .order('id', { ascending: true })
            if (errorActions) {
                setError(errorActions.message)
                console.log('error: ', errorActions)
                supabase.removeSubscription(mySubscription)
                mySubscription = null
                return
            }
            console.log('actions: ', actions)
            setEventActions(actions)

            // 2) Add user to event
            await supabase
                .from('event_users')
                .upsert(
                    { user_id: 1, event_id: id },
                    { onConflict: 'user_id' }
                )

            // 3) Retrieve event users
            const { data: users, errorUsers } = await supabase.from('event_users').select('*').eq('event_id', id)
            if (errorUsers) console.log('error: ', errorUsers)
            setEventUsers(users)
        }
    }
    const getActionsAndSubscribe = async (id) => {
        console.log('getActionsAndSubscribe() id: ', id)
        setError('')
        getInitialActions(id)
        if (!mySubscription) {
            mySubscription = supabase
                .from(`event_actions:event_id=eq.${id}`)
                .on('INSERT', (payload) => {
                    console.log('INSERT: ', payload.new)
                    setEventActions((a) => [...a, payload.new])
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

    const createAction = async (actionId) => {
        console.log('createAction')
        const { data, error } = await supabase.from('event_actions').insert([{ event_id: id, user_id: 1, action_id: actionId, participation_threshold: calculateParticipationThreshold() }])

        if (error) {
            alert(error.message)
            return
        }
        console.log('data: ', data)
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

    // const handleAction = async (actionId) =>

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Actions:</h1>
            <br />
            {/* <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                    createAction()
                }}
            >
                Create new action
            </Button> */}
            {/* <br /> */}
            {/* <Countdown date={Date.now() + 10000} onComplete={() => onCountdownComplete()} /> */}
            {/* <br /> */}
            <Box style={{ border: '1px solid orange' }}>
                <h3>Event users:</h3>
                <ul>
                    {eventUsers.map((user) => (
                        <li key={user.id}>{user.id}</li>
                    ))}
                </ul>
            </Box>
            <h3>Choose action:</h3>
            <Box display="flex" style={{ border: '1px solid red' }}>
                {actions.map((action) => (
                    <Box m={1} p={0} key={action.id}>
                        <Paper elevation={1} className={classes.paper} style={{ padding: '10px' }} onClick={() => createAction(action.id)}>
                            <Typography variant="h6">{action.name}</Typography>
                            <Typography variant="body2">{action.description}</Typography>
                        </Paper>
                    </Box>
                ))}
            </Box>
            <h3>Event actions:</h3>
            <Box style={{ maxHeight: '250px', overflow: 'auto', border: '1px solid green' }}>
                {eventActions.map((action) => (
                    <Box key={action.id}>
                        <Paper elevation={3} style={{ margin: 10, padding: 8 }}>
                            Action <i>{action.actions?.name}</i>, on event{' '}
                            <i>
                                {action.events?.home_team_name} - {action.events?.visitor_team_name}
                            </i>{' '},
                            by user <i>{action.users?.full_name}</i>, Participants: {action.number_participants}, isCompleted? {action.is_completed ? 'Yes' : 'No'}, expiredAt: {action.expired_at}, expiresIn: <Countdown date={action.expired_at} onComplete={() => onCountdownComplete(action)} />&nbsp;
                            <button onClick={() => joinAction(action.id)}>Participate</button>
                        </Paper>
                    </Box>
                ))}
                <div ref={actionsEndRef} />
            </Box>
        </>
    )
}
