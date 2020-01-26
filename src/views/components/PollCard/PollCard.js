import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  IconButton,
  Button
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import Person from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const PollCard = props => {
  const { className, poll, ...rest } = props;

  const classes = useStyles();

  const [footerToBaseLink] = useState(
    props.footerBtnText==='Vote' ? '/polls/vote': '/polls/view'
  );

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      {
        props.isJoin ? (
          <CardHeader
            action={
              <IconButton
                aria-label="settings"
                color="primary"
                onClick={props.handleJoinClick}
                size="medium"
              >
                <AddBoxRoundedIcon />
              </IconButton>
            }
          />
        ):(null)
      }
      <CardContent>
        <div className={classes.imageContainer}>
          <img
            alt="Company"
            className={classes.image}
            src={poll.imageUrl}
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {poll.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {poll.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {poll.startTime} - {poll.endTime}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <Person className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              Creator: {poll.creatorName}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
      { props.footerBtnText ? (
        <CardActions>
          <Link to={footerToBaseLink+'/'+poll.address}>
            <Button
              color="secondary"
              size="small"
              variant="contained"
            >
              {props.footerBtnText}
            </Button>
          </Link>
        </CardActions>
      ):(null)}
    </Card>
  );
};

PollCard.propTypes = {
  className: PropTypes.string,
  footerBtnText: PropTypes.string,
  handleJoinClick: PropTypes.func,  
  isJoin: PropTypes.bool,
  poll: PropTypes.object.isRequired,
};

export default PollCard;
