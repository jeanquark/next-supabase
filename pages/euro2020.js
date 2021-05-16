import { useState, useEffect } from 'react'
import { supabase } from '../lib/initSupabase'
import Head from 'next/head'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Box, Paper, Typography, Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    typography: {
        textAlign: 'center',
        margin: 'auto',
    },
}))

export default function euro2020() {
    const classes = useStyles()
    const [fixtures, setFixtures] = useState([])
    const [fixturesByGroup, setFixturesByGroup] = useState([[]])
    // const [standings, setStandings] = useState([])
    const [standingsByGroup, setStandingsByGroup] = useState([[]])

    useEffect(() => {
        fetchFixtures()
    }, [])
    useEffect(() => {
        fetchStandings()
    }, [])

    const fetchFixtures = async () => {
        let { data: fixtures, error } = await supabase.from('events').select('*').eq('league_id', 4).order('date', true)
        if (error) console.log('error', error)
        else {
            console.log('fixtures: ', fixtures)
            setFixtures(fixtures)
            const array = [[]]
            let index
            const groupIndexHashObject = {
                A: 0,
                B: 1,
                C: 2,
                D: 3,
                E: 4,
                F: 5,
            }
            for (let i = 0; i < fixtures.length; i++) {
                index = groupIndexHashObject[fixtures[i]['group']]
                // console.log('index: ', index)
                if (!array[index]) {
                    array[index] = []
                }
                array[index].push(fixtures[i])
            }
            // console.log('array: ', array)
            setFixturesByGroup(array)
            // console.log('fixturesByGroup: ', fixturesByGroup)
        }
    }

    const fetchStandings = async () => {
        let { data: standings, error } = await supabase.from('standings').select('*').order('group_name', true)
        if (error) console.log('error', error)
        else {
            console.log('standings: ', standings)
            const array = [[]]
            let temp = ''
            let count = -1
            for (let i = 0; i < standings.length; i++) {
                if (standings[i]['group_name'] != temp) {
                    temp = standings[i]['group_name']
                    count++
                    array[count] = []
                    array[count].push(standings[i])
                } else {
                    array[count].push(standings[i])
                }
            }
            setStandingsByGroup(array)
            // console.log('standingsByGroup: ', standingsByGroup)
        }
    }

    // const fixturesByGroup = async (index) => {
    //     console.log('fixturesByGroup: ', fixtures)
    // }

    // const groups = [[]]
    // const groups2 = [
    //     [
    //         {
    //             id: 1,
    //             rank: 1,
    //             name: 'Switzerland',
    //         },
    //         {
    //             id: 2,
    //             rank: 2,
    //             name: 'Italy',
    //         },
    //     ],
    //     [
    //         {
    //             id: 3,
    //             rank: 1,
    //             name: 'France',
    //         },
    //         {
    //             id: 4,
    //             rank: 2,
    //             name: 'England',
    //         },
    //     ],
    // ]

    return (
        <>
            <Head>
                <title>Euro 2020</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar title={'Euro 2020'} links={['fixtures', 'test']} />

            <Grid container>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>Map</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h5" className={classes.typography}>
                                Standings
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            spacing={3}
                            style={{
                                margin: 0,
                                width: '100%',
                            }}
                        >
                            {standingsByGroup.map((group, index) => (
                                <Grid item xs={6} key={index}>
                                    <TableContainer component={Paper} key={index}>
                                        <Typography variant="h6" className={classes.typography}>
                                            {group && group[0] ? group[0]['group_name'] : ''}
                                        </Typography>

                                        <Table aria-label="simple table">
                                            <TableBody>
                                                {fixturesByGroup[index] ? (fixturesByGroup[index].map((fixture, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell align="left">{fixture.home_team_name}</TableCell>
                                                        <TableCell align="center">
                                                            {fixture.home_team_score} - {fixture.visitor_team_score}
                                                        </TableCell>
                                                        <TableCell align="right">{fixture.visitor_team_name}</TableCell>
                                                    </TableRow>
                                                ))) : 'no data'}
                                            </TableBody>
                                        </Table>

                                        <br /><br />

                                        <Table aria-label="simple table" size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Rank</TableCell>
                                                    <TableCell align="right">Pts</TableCell>
                                                    <TableCell align="right">Played</TableCell>
                                                    <TableCell align="right">Diff</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {group.map((team, index) => (
                                                    <TableRow key={team.id}>
                                                        <TableCell component="th" scope="row">
                                                            {team.rank}.&nbsp;&nbsp;{team.team_name}
                                                        </TableCell>
                                                        <TableCell align="right">{team.points}</TableCell>
                                                        <TableCell align="right">{team.all_played}</TableCell>
                                                        <TableCell align="right">{team.goals_diff}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
