import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Grid,
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
/*
import { DateTimePicker } from '@material-ui/pickers';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
*/

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
  gapBetween: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  gapBetweenExtra: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));


const CreatePoll = () => {
  const classes = useStyles();

  
  const [values, setValues] = useState({
    creatorName: 'John Doe',
    pollName: 'Vote for selecting Managing Director',
    shortDesc: 'Hello short',
    longDesc:'Hello long long',
    eligibility: 'Only Senior Partners from Pearson Specter Litt can vote.',
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.root}>
        <div className={classes.content}>
          <Grid
            container
          >
            <Card
              className={clsx(classes.root)}
            >
              <form
                autoComplete="off"
                noValidate
              >
                <CardHeader
                  subheader=""
                  title="Create Poll"
                />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    justify={'center'}
                    spacing={3}
                  >
                    <Grid
                      item
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        helperText="Please specify your name."
                        label="Creator Name"
                        margin="dense"
                        name="creatorName"
                        onChange={handleChange}
                        required
                        value={values.creatorName}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Poll Name"
                        margin="dense"
                        name="pollName"
                        onChange={handleChange}
                        required
                        value={values.pollName}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Short Description"
                        margin="dense"
                        name="shortDesc"
                        onChange={handleChange}
                        required
                        value={values.shortDesc}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Long Description"
                        margin="dense"
                        multiline
                        name="longDesc"
                        onChange={handleChange}
                        required
                        rowsMax="10"
                        rowsMin="2"
                        value={values.longDesc}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        helperText="Use semi-colon(;) to separate candidate names"
                        label="Candidate names"
                        margin="dense"
                        name="candidateNames"
                        onChange={handleChange}
                        required
                        value={values.candidateNames}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Eligibility Criteria"
                        margin="dense"
                        name="eligibility"
                        onChange={handleChange}
                        required
                        value={values.eligibility}
                      />
                    </Grid>
                    <Grid
                      item
                      lg={12}
                      xs={12}
                    >
                      <Grid
                        className={classes.gapBetweenExtra}
                        container
                        lg={12}
                        xs={12}
                      >
                        <Grid
                          item
                          lg={6}
                          sm={6}
                          xs={12}
                        >
                          <DateTimePicker
                            ampm={false}
                            autoOk
                            label="Poll Start DateTime"
                          />
                        </Grid>
                        <Grid
                          item
                          lg={6}
                          sm={6}
                          xs={12}
                        >
                          <DateTimePicker
                            ampm={false}
                            autoOk
                            label="Poll End DateTime"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <Typography 
                        className={classes.subheading}
                        variant={'h6'} 
                      >
                      Authentication Program
                      </Typography>
                      <Box className={classes.subsection}>
                        <Button
                          className={classes.button}
                          component="label"
                          variant="contained"
                        >
                        Choose File
                          <input
                            style={{ display: 'none' }}
                            type="file"
                          />
                        </Button>
                        <Button
                          className={classes.button}
                          color="secondary"
                          variant="contained"
                        >
                        Upload
                        </Button>
                      </Box>
                    </Grid>
                    {/*
                    <Grid
                      item
                      xs={12}
                    >
                      <Grid
                        item
                        xs={6}
                      >
                        <KeyboardDatePicker
                          disableToolbar
                          format="MM/dd/yyyy"
                          id="date-picker-inline"
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          label="Date picker inline"
                          margin="normal"
                          value={selectedDate}
                          variant="inline"
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <KeyboardTimePicker
                          disableToolbar
                          id="time-picker"
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                          label="Time picker"
                          margin="normal"
                          value={selectedDate}
                          variant="inline"
                        />
                      </Grid>
                    </Grid>
                    */}
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button
                    color="primary"
                    variant="contained"
                  >
                  Create Poll
                  </Button>
                </CardActions>
              </form>
            </Card>
          </Grid>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default CreatePoll;