import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Icon from './Icon';

import _ from 'lodash';
import { getConnectedUser } from 'actions';
import { AjaxService } from 'services';
import utils from 'utils';

// STORE
function mapStateToProps ({dataReducer}){
  let {user} = dataReducer;
  return {user}
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class SelectDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      userList: [],
      user: props.user,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleRequestOkay = this.handleRequestOkay.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        user: nextProps.user
    })
  }
  render() {
    const { classes, user } = this.props;
    return (
      <div>
        <Icon label={user||'Click To Connect'} color={user ?'white': 'gray'}
          onClick={this.handleClickOpen}
        >people</Icon>
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <DialogTitle>Select User</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="user-simple">User</InputLabel>
                <Select
                  value={this.state.user || "None"}
                  onChange={this.handleChange('user')}
                  input={<Input id="user-simple" />}
                >
                  <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
                  {
                    this.state.userList
                    ? this.state.userList.map((userName, index) =>
                      <MenuItem key={index} value={userName}>{userName}</MenuItem>
                    )
                    : null
                  }
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestOkay} color="primary">
              Ok
            </Button>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  async handleClickOpen() {
    let userList = await AjaxService.getUserList();
    this.setState({ open: true, userList});
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  async handleRequestOkay() {
    const { user } = this.state;

    // return when it is not selected user
    if (!user) {
        return;
    }

    this.props.dispatch(getConnectedUser(user));
    this.setState({open: false});
    utils.updateCurrentView();
  };
}

SelectDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(SelectDialog));
