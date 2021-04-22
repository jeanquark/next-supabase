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
    },
}))

export default function EventDetails(props) {
    const classes = useStyles()
    return (
        <Box>
            <Box display="flex" style={{ margin: 10, padding: 8 }}>
                <Box m="auto">
                    <div className={classes.avatar}>
                        <Avatar variant="square" alt="Home team image" src={props.event.home_team_image} />
                        <Avatar variant="square" alt="Visitor team image" src={props.event.visitor_team_image} className={classes.small} />
                    </div>
                    <Typography variant="h5" align="center">
                        {props.event.home_team_name} - {props.event.visitor_team_name}
                    </Typography>
                    {/* <Typography component="p" align="center">
                        <b>{props.event.home_team_score}</b>&nbsp;:&nbsp;<b>{props.event.visitor_team_score}</b>
                    </Typography> */}
                    <Typography component="p" align="center">
                        <b>{props.event.venue}</b>,&nbsp;<b>{props.event.city}</b>
                    </Typography>
                    <Typography component="p" align="center">
                        <Moment format="ddd Do MMM YYYY, HH:mm">{props.event.date}</Moment>
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
