import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { PollCard } from '../components/PollCard';
import uuid from 'uuid/v1';

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
    title: 'Dropbox',
    description:
      'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    imageUrl: '/images/products/product_1.png',
    totalDownloads: '594',
    updatedAt: '27/03/2019',
    creator: 'John Doe',
    startTime: '26th Jan',
    endTime: '27th Jan' 
  },
  {
    id: uuid(),
    title: 'Medium Corporation',
    description:
      'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    imageUrl: '/images/products/product_2.png',
    totalDownloads: '625',
    createdAt: '31/03/2019',
    creator: 'John Doe',
    startTime: '26th Jan',
    endTime: '27th Jan'
  },
  {
    id: uuid(),
    title: 'Slack',
    description:
      'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    imageUrl: '/images/products/product_3.png',
    totalDownloads: '857',
    createdAt: '03/04/2019',
    creator: 'John Doe',
    startTime: '26th Jan',
    endTime: '27th Jan'
  },
  {
    id: uuid(),
    title: 'Lyft',
    description:
      'Lyft is an on-demand transportation company based in San Francisco, California.',
    imageUrl: '/images/products/product_4.png',
    totalDownloads: '406',
    createdAt: '04/04/2019',
    creator: 'John Doe',
    startTime: '26th Jan',
    endTime: '27th Jan'
  },
  {
    id: uuid(),
    title: 'GitHub',
    description:
      'GitHub is a web-based hosting service for version control of code using Git.',
    imageUrl: '/images/products/product_5.png',
    totalDownloads: '835',
    createdAt: '04/04/2019',
    creator: 'John Doe',
    startTime: '26th Jan',
    endTime: '27th Jan'
  },
  {
    id: uuid(),
    title: 'Squarespace',
    description:
      'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
    imageUrl: '/images/products/product_6.png',
    totalDownloads: '835',
    createdAt: '04/04/2019',
    creator: 'John Doe',
    startTime: '26th Jan',
    endTime: '27th Jan'
  }
];


const RegisteredPolls = () => {
  const classes = useStyles();

  const [products] = useState(mockData);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {products.map(product => (
            <Grid
              item
              key={product.id}
              lg={4}
              md={6}
              xs={12}
            >
              <PollCard 
                footerBtnText={'Vote'}
                isJoin={false}
                product={product}
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

export default RegisteredPolls;