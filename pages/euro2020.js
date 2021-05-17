import { useState, useEffect } from 'react'
import { supabase } from '../lib/initSupabase'
import Head from 'next/head'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Container, Grid, Box, Paper, Typography, Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, NoSsr } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Navbar from '../components/Navbar'
import dynamic from 'next/dynamic'
import Moment from 'react-moment'

const useStyles = makeStyles((theme) => ({
    // root: {
    //     flexGrow: 1,
    // },
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        display: 'inline-block',
        verticalAlign: 'middle',
        margin: '0px 1em'
    },
    inline: {
        display: 'inline-block',
        verticalAlign: 'middle'
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
    const [country, setCountry] = useState('europe-uefa-euro2020')

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
                index = groupIndexHashObject[fixtures[i]['group_name']]
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

    const getDynamicComponent = (c) => dynamic(() => import(`../components/svg/${c}`), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    });
    const DynamicComponent = getDynamicComponent(country);

    return (
        <>
            <Head>
                <title>Euro 2020</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar title={'Euro 2020'} links={['fixtures', 'test']} />

            <Grid container alignItems="center" justify="center">

                <DynamicComponent style={{}} />

                <Grid item sm={12} md={12}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Box mt={4}>
                                <Typography gutterBottom variant="h5" className={classes.typography}>
                                    Groups
                            </Typography>
                            </Box>
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
                                <Grid item xs={12} sm={6} md={12} lg={6} key={index}>
                                    <TableContainer component={Paper} key={index}>
                                        <Typography variant="h6" className={classes.typography}>
                                            {group && group[0] ? group[0]['group_name'] : ''}
                                        </Typography>

                                        {/* <NoSsr> */}
                                        <Table aria-label="simple table" size="small">
                                            <TableBody>
                                                {fixturesByGroup[index]?.map((fixture, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell align="left"><Avatar className={classes.avatar} src={`/images/countries_euro2020/${fixture.home_team_id}.png`} />
                                                        <span className={classes.inline}>{fixture.home_team_name}</span>
                                                        </TableCell>
                                                        {/* <TableCell align="center">
                                                            {fixture.home_team_score} - {fixture.visitor_team_score}
                                                        </TableCell> */}
                                                        <TableCell align="center">
                                                            <Moment local format="DD-MM HH:mm">{fixture.date}</Moment>
                                                        </TableCell>
                                                        <TableCell align="right"><span className={classes.inline}>{fixture.visitor_team_name}</span><Avatar className={classes.avatar} src={`/images/countries_euro2020/${fixture.visitor_team_id}.png`} /></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        {/* </NoSsr> */}

                                        <br /><br />

                                        <Table aria-label="simple table" size="small">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Rank</TableCell>
                                                    <TableCell align="right">pts</TableCell>
                                                    <TableCell align="right">Played</TableCell>
                                                    <TableCell align="right">+/-</TableCell>
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
