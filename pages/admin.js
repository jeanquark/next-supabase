import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Auth } from '@supabase/ui'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'


export default function Admin() {
	const { user, session } = Auth.useUser()
	const router = useRouter();
    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        let { data, error } = await supabase.from('users').select('*')
        if (error) console.log('error', error)
        else { console.log('data: ', data) }
    }

	return (
		<div>
			<Head>
				<title>Admin - Next Supabase</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
            <Navbar title={'Admin'} links={['fixtures']} />

			<main className={styles.main}>
				<h2>Admin only page.</h2>
                <p>user.role: {user?.role}</p>
				
			</main>
		
			<footer className={styles.footer}>
			</footer>
		</div>
	)
}
