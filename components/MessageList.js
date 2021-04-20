import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/initSupabase'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from '@supabase/ui'
import Link from 'next/link'
import Moment from 'react-moment'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import FormGroup from '@material-ui/core/FormGroup'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5)
    }
}))

export default function Messages() {
    const router = useRouter()
    const { id } = router.query
    const [messages, setMessages] = useState([])
    const { user, session } = Auth.useUser()
    const classes = useStyles()
    // const [isAuthed, setAuthStatus] = useState(false);
    // const [authUser, setAuthUser] = useState(null);
    // useEffect(() => {
    //     fetch("/api/getUser")
    // 		.then((response) => response.json())
    // 		.then((result) => {
    //             setAuthStatus(result.user && result.user.role === "authenticated");
    //             if (result.user && result.user.role === "authenticated") {
    //                 setAuthUser(result.user)
    //             }
    // 		});
    // }, [])
    useEffect(() => {
        fetchMessages(id);
    }, [id])
    useEffect(() => {
        supabase
            .from(`messages:event_id=eq.${id}`)
            .on("INSERT", (message) => {
                if (message.new) {
                    console.log('message.new: ', message.new)
                    setMessages([...messages, message.new])
                    console.log('messages2: ', messages)
                }
            })
            .subscribe();
    }, [messages, setMessages])

    useEffect(() => {
        supabase.from('messages').on("DELETE", payload => {
            console.log('payload: ', payload)
            const newMessagesList = messages.filter((item) => item.id !== payload.old.id)
            console.log('newMessagesList: ', newMessagesList)
            setMessages(newMessagesList);
        }).subscribe()
    }, [messages, setMessages])

    const fetchMessages = async (id) => {
        let { data: messages, error } = await supabase.from('messages').select('*').eq('event_id', id)
        if (error) {
            console.log('error', error)
        }
        else {
            console.log('messages: ', messages)
            setMessages(messages)
        }
    }
    const subscribeMessages = async () => {
    }

    const unsubscribeMessages = async () => {
        supabase.removeSubscription(messages);
    }

    const sendMessage = async (event) => {
        event.preventDefault();
        console.log('sendMessage: ', event)
        const { data, error } = await supabase
            .from('messages')
            .insert([
                { content: event.target.message.value, event_id: id, user_id: 1, user_email: user?.email }
            ])
        console.log('data: ', data)
        event.target.message.value = ''
    }

    const deleteMessage = async (messageId, messageUserEmail) => {
        console.log('deleteMessage: ', messageId, messageUserEmail)
        if (messageUserEmail && messageUserEmail != user?.email) {
            return alert('You cannot delete a message that is not yours.')
        }
        const { data, error } = await supabase
            .from('messages')
            .delete()
            .match({ id: messageId })
        console.log('data: ', data)
        console.log('error: ', error)
    }

    return (
        // <div style={{ margin: '20px', padding: '0px 20px 20px 20px', border: '1px solid grey' }}>
        //     <h3>Chat forum</h3>
        //     user: {user?.email}
        //     <div>
        //         <ul>
        //             {messages.map((message) => (
        //                 <li key={message.id}>{message.content} - <i>by</i> {message?.user_email || 'anonymous'} <i>at</i> <Moment format="HH:mm">{message.inserted_at}</Moment>&nbsp;<button onClick={(e) => deleteMessage(message.id, message.user_email)}>&times;</button></li>
        //             ))}
        //         </ul>
        //         <form onSubmit={sendMessage}>
        //             <label htmlFor="message">Your message</label>
        //             <input
        //                 id="message"
        //                 name="message"
        //                 type="text"
        //                 autoComplete="message"
        //                 required
        //             />
        //             <button type="submit">Send</button>
        //         </form>
        //     </div>
        // </div>

        <Container className={classes.container}>
            <Link href="/"><a>Home</a></Link><br />
            <Link href="/fixtures"><a>Fixtures</a></Link><br />
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6}>
                    <h1 style={{ textAlign: 'center' }}>Event:</h1>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <h1 style={{ textAlign: 'center' }}>Chatroom:</h1>
                    <form className={classes.root} noValidate autoComplete="off">
                        <FormGroup>
                        <TextField id="standard-basic" label="Message" />
                        <Button variant="contained" color="primary" size="small">
                            Send
                        </Button>
                        </FormGroup>
                    </form>

                    <Paper elevation={3} style={{ padding: 10 }}>
                        My first message
                    </Paper>
                    <Paper elevation={3}>
                        My second message
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

