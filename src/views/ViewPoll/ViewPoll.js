import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Grid,
  Card
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  heading: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '300',
  },
  subsection: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
  },
}));


const ViewPoll = (props) => {
  const classes = useStyles();

  const [pollId, setPollId] = useState(props.match.params.pollId);

  useEffect( () => {
    async function fetchAPI() {
      try {
        // Fetch Poll Details
      } catch(error) {
        console.log(error.toString());
      }
    }
    fetchAPI();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid
          container
        >
          <Card
            className={clsx(classes.root)}
          >
            {pollId}
          </Card>
        </Grid>
      </div>
    </div>
  );
};

ViewPoll.propTypes = {
  match:  PropTypes.object.isRequired
};

export default ViewPoll;