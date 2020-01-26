import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { PollCard } from '../components/PollCard';
import uuid from 'uuid/v1';

import { getAllPolls } from '../../utils/pollchain';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));


const mockData = [
  {
    id: uuid(),
    pollName: 'Dropbox',
    shortDesc:
      'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    imageUrl: '/images/products/product_1.png',
    totalDownloads: '594',
    updatedAt: '27/03/2019',
    creatorName: 'John Doe',
    startTime: '26th Jan',
    endTime: '27th Jan' 
  },
  {
    id: uuid(),
    pollName: 'Medium Corporation',
    shortDesc:
      'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    imageUrl: '/images/products/product_2.png',
    totalDownloads: '625',
    createdAt: '31/03/2019',
    creatorName: 'John Doe',
    startTime: '26th Jan',
    endTime: '27th Jan'
  },
  {
    id: uuid(),
    pollName: 'Slack',
    shortDesc:
      'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    imageUrl: '/images/products/product_3.png',
    totalDownloads: '857',
    createdAt: '03/04/2019',
    creatorName: 'John Doe',
    startTime: '26th Jan',
    endTime: '27th Jan'
  },
  {
    id: uuid(),
    pollName: 'Lyft',
    shortDesc:
      'Lyft is an on-demand transportation company based in San Francisco, California.',
    imageUrl: '/images/products/product_4.png',
    totalDownloads: '406',
    createdAt: '04/04/2019',
    creatorName: 'John Doe',
    startTime: '26th Jan',
    endTime: '27th Jan'
  },
  {
    id: uuid(),
    pollName: 'GitHub',
    shortDesc:
      'GitHub is a web-based hosting service for version control of code using Git.',
    imageUrl: '/images/products/product_5.png',
    totalDownloads: '835',
    createdAt: '04/04/2019',
    creatorName: 'John Doe',
    startTime: '26th Jan',
    endTime: '27th Jan'
  },
  {
    id: uuid(),
    pollName: 'Squarespace',
    shortDesc:
      'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
    imageUrl: '/images/products/product_6.png',
    totalDownloads: '835',
    createdAt: '04/04/2019',
    creatorName: 'John Doe',
    startTime: '26th Jan',
    endTime: '27th Jan'
  }
];


const AllPolls = () => {
  const classes = useStyles();

  const [polls, setPolls] = useState(mockData);

  const handleJoinClick = async () => {
    console.log('Join clicked');
  };

  useEffect( () => {
    async function fetchBC() {
      try {
        // Fetch Poll Details
        let allPolls = await getAllPolls();
        console.log(allPolls);
        setPolls(allPolls);
      } catch(error) {
        console.log(error.toString());
      }
    }
    fetchBC();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {polls.map(poll => (
            <Grid
              item
              key={poll.address}
              lg={4}
              md={6}
              xs={12}
            >
              <PollCard 
                handleJoinClick={handleJoinClick}
                isJoin 
                poll={poll} 
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AllPolls;