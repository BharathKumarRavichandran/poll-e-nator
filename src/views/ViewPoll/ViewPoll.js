/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slide,
  Typography,
  Divider,
  Paper,
  Button,
  TextField
} from '@material-ui/core';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Person from '@material-ui/icons/Person';
import UpdateIcon from '@material-ui/icons/Update';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';

import { voteForPoll, getPollDetailsFromAddress, getBallotContract } from '../../utils/pollchain';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  },
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
    height: 48,
    width: 48
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
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
  },
  shortDesc: {
    marginBottom: theme.spacing(1)
  },
  longDesc: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  gapBetween: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  gapBetweenExtra: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  buttonMargin: {
    margin: theme.spacing(1)
  }
}));

const pollData = {
  id: 'sadasd',
  pollName: 'Dropbox',
  imageUrl: '/images/products/product_1.png',
  creatorName: 'John Doe',
  shortDesc: 'sadassd',
  longDesc: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  startTime: '26th Jan',
  endTime: '27th Jan',
  revealTime: '28th Jan',
  candidates: ['John', 'Pearson', 'Harvey']
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewPoll = (props) => {
  const classes = useStyles();

  const [pageType] = useState(props.location.pathname.split('/')[2]);
  const [poll, setPoll] = useState(pollData);
  const [pollAddress] = useState(props.match.params.pollAddress);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [votedCandidate, setVotedCandidate] = useState('John');

  const handleVerifyVote = async () => {
    setDialogOpen(true);
  };

  const handleDialogClose = async () => {
    setDialogOpen(false);
  };

  const handleRevealResults = async () => {
    
  };

  const handleVoteClick = async () => {
    await voteForPoll();
  };

  useEffect( () => {
    async function fetchBC() {
      try {
        let pollDetails = await getPollDetailsFromAddress(pollAddress, await getBallotContract());
        console.log(pollDetails);
        setPoll(pollDetails);
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
          item
          lg={12}
          spacing={3}
          xs={12}
        >
          <Card
            className={clsx(classes.root)}
            style={{ width: '100%'}}
          >
            <CardHeader
              action={
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
              }
            />
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
                {poll.pollName}
              </Typography>
              <Typography
                align="center"
                className={classes.shortDesc}
                variant="body1"
              >
                {poll.shortDesc}
              </Typography>
              <Typography
                align="left"
                className={classes.longDesc}
                variant="body1"
              >
                {poll.longDesc}
              </Typography>
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
                    Start Date: {poll.startTime}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                className={classes.gapBetween}
                container
                justify="space-between"
              >
                <Grid
                  className={classes.statsItem}
                  item
                >
                  <UpdateIcon className={classes.statsIcon} />
                  <Typography
                    display="inline"
                    fontSize="large"
                    variant="body2"
                  >
                    End Date: {poll.endTime}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justify="space-between"
              >
                <Grid
                  className={classes.statsItem}
                  item
                >
                  <AlarmOnIcon className={classes.statsIcon} />
                  <Typography
                    display="inline"
                    variant="body2"
                  >
                    Reveal Date: {poll.revealTime}
                  </Typography>
                </Grid>
              </Grid>
              { pageType === 'view' ? (
                <React.Fragment>
                  {/*
                  <Grid
                    className={classes.gapBetween}
                    container
                    justify="space-between"
                    lg={6}
                    md={12}
                    xs={12}
                  >
                    <Grid
                      className={classes.gapBetween}
                      container
                      justify="space-between"
                      lg={9}
                      md={9}
                      xs={9}
                    >
                      <TextField
                        fullWidth
                        label="Transaction ID"
                        margin="dense"
                        name="transactionId"
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      className={classes.gapBetween}
                      container
                      justify="space-between"
                      lg={3}
                      md={3}
                      xs={3}
                    >
                      <Button
                        className={classes.buttonMargin}
                        color="secondary"
                        variant="contained"
                        onClick={handleVerifyVote}
                      >
                        Verify Vote
                      </Button>
                    </Grid>
                  </Grid>
                  */}
                  <Grid
                    className={classes.gapBetween}
                    container
                    justify="center"
                  >
                    <Button
                      className={classes.gapBetweenExtra}
                      color="primary"
                      variant="contained"
                      onClick={handleRevealResults}
                    >
                    Reveal Results
                    </Button>
                  </Grid>
                </React.Fragment>
              ):(
                <React.Fragment>
                  <Grid
                    className={classes.gapBetweenExtra}
                    container
                    justify="left"
                  >
                    <FormControl
                      className={classes.formControl}
                      component="fieldset"
                    >
                      <FormLabel
                        className={classes.gapBetween}
                        component="legend"
                      >
                        Candidate
                      </FormLabel>
                      <RadioGroup
                        aria-label="candidate"
                        name="candidate"
                      >
                        { poll.candidates.map(candidate => (
                          <FormControlLabel
                            control={<Radio />}
                            label={candidate}
                            value={candidate}
                          />
                        ) )
                        }
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid
                    className={classes.gapBetween}
                    container
                    justify="space-between"
                    lg={6}
                    md={12}
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Token"
                      margin="dense"
                      name="token"
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    className={classes.gapBetween}
                    container
                    justify="space-between"
                  >
                    <Button
                      className={classes.buttonMargin}
                      color="primary"
                      variant="contained"
                      onClick={handleVoteClick}
                    >
                      Vote
                    </Button>
                    <Button
                      className={classes.buttonMargin}
                      color="secondary"
                      variant="contained"
                    >
                      Leave Poll
                    </Button>
                  </Grid>
                </React.Fragment>
              )}
            </CardContent>
            {/*<CardActions>
            </CardActions>
            */}
          </Card>
        </Grid>

        {/* Modal Dialog */}
        <Dialog
          aria-describedby="alert-dialog-slide-description"
          aria-labelledby="alert-dialog-slide-title"
          keepMounted
          open={dialogOpen}
          TransitionComponent={Transition}
        >
          <DialogTitle id="alert-dialog-slide-title">{'Vote Verification'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You voted for candidate: {votedCandidate}.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={handleDialogClose}
            >
            Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

ViewPoll.propTypes = {
  location: PropTypes.object.isRequired,
  match:  PropTypes.object.isRequired
};

export default ViewPoll;