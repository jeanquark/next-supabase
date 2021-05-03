import { useState, useEffect } from 'react'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/initSupabase'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from '@supabase/ui'
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
    const [error, setError] = useState('')
    const actionsEndRef = useRef(null)
    let mySubscription = null

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
                const index = actions.findIndex(a => a.id == updateAction.id)
                console.log('index: ', index)
                let newActions = [...actions]
                newActions[index]['number_participants'] = updateAction.number_participants
                setActions(newActions)
            }
        } catch (error) {
            console.log('error: ', error)
        }
    }, [updateAction])

    useEffect(() => {
        console.log("[useEffect] id: ", id)
        if (id != undefined) {
            getActionsAndSubscribe(id)
        }
        return () => {
            supabase.removeSubscription(mySubscription)
            console.log('Remove supabase subscription by useEffect unmount')
        }
    }, [id])

    // const handleCreateAction = (newAction) => {
    //     console.log('handleCreateAction: newAction: ', newAction)
    //     setActions((a) => [...a, newAction])
    // }

    const handleUpdateAction2 = (updatedAction) => {
        // function handleUpdateAction (updatedAction) {
        console.log('handleUpdateAction: updatedAction', updatedAction)
        setActions((actions) => {
            actions.map(x => {
                console.log('x: ', x)
            })
        })
        // setActions((a) => [...a])
        // const newClicks = [...actions];
        // console.log('newClicks: ', newClicks)
        // const index = this.actions.findIndex(action => action.id == 2)
        // console.log('index: ', index)

        // setActions(actions.map(x => {
        //     if(x.id !== 2) return x
        //     return {...x}
        //     // if (x.id === updatedAction.id) {
        //     //     console.log('Update number_participants for item ', x.id)
        //     //     // x.number_participants = updatedAction.number_participants
        //     // }
        //     // return { ...x }
        // }))


        // let updatedList = state.todos.map(item => 
        //     {
        //       if (item.id == 1){
        //         return {...item, done: !item.done}; //gets everything that was already in item, and updates "done"
        //       }
        //       return item; // else return unmodified item 
        //     });

        //   setActions({todos: updatedList}); // set state to new object with updated list

        // console.log('[...actions]: ', [...actions])
        // setActions((a) => [...a, {}])

        // let newArr = [...datas]; // copying the old datas array
        // newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to
    }


    const getInitialActions = async (id) => {
        console.log('getInitialActions')
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
            <Button variant="contained" color="primary" size="small" onClick={() => { createAction() }}>Create new action</Button>
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
