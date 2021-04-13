import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/initSupabase'

export default function Messages() {
    const router = useRouter()
    const { id } = router.query
    const [messages, setMessages] = useState([])
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
    return (
        <div>
            <h3>Chat forum</h3>
            <div>
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>{message.content}</li>
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

