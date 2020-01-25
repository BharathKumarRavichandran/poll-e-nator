import React from 'react';
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
  IconButton
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
  const { className, product, ...rest } = props;

  const classes = useStyles();

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
            src={product.imageUrl}
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {product.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {product.description}
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
              {product.startTime} - {product.endTime}
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
              Creator: {product.creator}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

PollCard.propTypes = {
  className: PropTypes.string,
  isJoin: PropTypes.bool.isRequired,
  product: PropTypes.object.isRequired,
};

export default PollCard;
