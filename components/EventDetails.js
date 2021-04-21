import Link from 'next/link'
import { Box, Paper, Avatar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Moment from 'react-moment'

const useStyles = makeStyles((theme) => ({
    avatar: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(10),
            height: theme.spacing(7),
        },
    }
}))

export default function EventDetails(props) {
    const classes = useStyles()
    return (
        <Box>
            <Paper elevation={3} style={{ margin: 10, padding: 8, display: 'flex', justifyContent: 'center' }}>
                <div className={classes.avatar}>
                    {/* <Avatar variant="square" alt="Home team image" src={props.event.home_team_image} />
                    <Avatar variant="square" alt="Visitor team image" src={props.event.visitor_team_image} className={classes.small} /> */}
                </div>
                <Typography component="p" style={{ display: 'inline-flex' }}>
                    {props.event.home_team_name} - {props.event.visitor_team_name}
                </Typography>
                <Typography component="p">
                    <b>{props.event.home_team_score}</b>&nbsp;:&nbsp;<b>{props.event.visitor_team_score}</b>
                </Typography>
            </Paper>
            <h3>Event details:</h3>
            props.id: {props.event.id}
            <b>{props.event.home_team_name}</b>&nbsp;-&nbsp;
            <b>{props.event.visitor_team_name}</b>&nbsp;&nbsp;&nbsp;
            <b>{props.event.home_team_score}:{props.event.visitor_team_score}</b>
            <span style={{ marginLeft: '10px' }}>{props.event.venue},</span>
            <span style={{ marginLeft: '10px' }}>{props.event.city},</span>
            <span style={{ marginLeft: '10px' }}><Moment format="ddd Do MMM YYYY HH:mm">{props.event.date}</Moment></span>
        </Box>
    )
}