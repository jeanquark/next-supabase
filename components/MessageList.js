import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/initSupabase'
import Moment from 'react-moment';

export default function Messages() {
    const router = useRouter()
    const { id } = router.query
    const [messages, setMessages] = useState([])
    const [isAuthed, setAuthStatus] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        fetch("/api/getUser")
			.then((response) => response.json())
			.then((result) => {
                setAuthStatus(result.user && result.user.role === "authenticated");
                if (result.user && result.user.role === "authenticated") {
                    setAuthUser(result.user)
                }
			});
    }, [])
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
                { content: event.target.message.value, event_id: id, user_id: 1 }
            ])
        console.log('data: ', data)
    }

    const deleteMessage = async (event, messageId) => {
        console.log('deleteMessage: ', event, messageId)
        const { data, error } = await supabase
            .from('messages')
            .delete()
            .match({ id: messageId })
        console.log('data: ', data)
        console.log('error: ', error)
    } 

    return (
        <div>
            <h3>Chat forum</h3>
            {isAuthed ? 'isAuth' : 'is not auth'}<br />
            {authUser?.email}
            <div>
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>{message.content} - <i>by</i> {message.id} <i>at</i> <Moment format="HH:mm">{message.inserted_at}</Moment><button onClick={(e) => deleteMessage(e, message.id)}>Delete</button></li>
                    ))}
                </ul>
                <form onSubmit={sendMessage}>
                    <label htmlFor="message">Your message</label>
                    <input
                        id="message"
                        name="message"
                        type="text"
                        autoComplete="message"
                        required
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

