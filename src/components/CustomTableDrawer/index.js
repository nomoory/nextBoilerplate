import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import GridLayout from 'material-ui/Grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { TableCell, TableRow, Typography } from 'material-ui';

import Icon from '../Icon';
import { updateConnectedUser } from 'actions';
import { RESTService } from 'services';
import utils from 'utils';

const ReactJson = dynamic(import('react-json-view'));

// STORE
function mapStateToProps ({dataReducer}){
    let {user} = dataReducer;
    return {user}
}

const styles = {
    containerStyle: {
        width: 'auto',
        maxHeight: '630px'
    },
    loadingStyle:{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      color: '#999999'
    }
}

const tableStyles = {
    cell: {
        paddingLeft: '8px',
        overflow: 'auto',
        verticalAlign: 'top'
      }
  };



const CustomCellBase = ({ style, value, column, classes, children }) => {
    let data = value || children;
    if (value && value.indexOf("{") !== -1) {
        data = (<ReactJson src={JSON.parse(value)} collapsed={false} enableClipboard={false} displayDataTypes={false} style={{ fontSize: '11px', fontFamily: 'Roboto' }} />);
    }

    return (
    <TableCell
        className={classes.cell}
    >
        {data}
    </TableCell>
)};

const CustomCell = withStyles(tableStyles)(CustomCellBase);

class ConnectionStateDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDrawer: false,
            idColunms: [{
                name: "userId", title: "User ID"
            },{
                name: "viewId", title: "View ID"
            },{
                name: "audioId", title: "Audio ID"
            },],
            idRows: [],
            sessionColunms: [{
                name: "recoSession", title: "Recode Session"
            },{
                name: "viewSession", title: "View Session"
            },{
                name: "audioSession", title: "Audio Session"
            },],
            sessionRows: [],
            appColumns: [{
                name: "appName", title: "App Name"
            },{
                name: "language", title: "Language"
            },{
                name: "clientCfg", title: "Client Config"
            }],
            appRows: [],
            connectionState: {},
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    toggleDrawer(open){
        return async (e) => {
            this.setState({
                showDrawer: open,
            });
        }
    }

    async handleClickOpen(e) {
        let {
            userId, viewId, audioId,
            recoSession, viewSession, audioSession,
            appName, language, clientCfg
        } = await RESTService.getConnectionState(this.props.user);
        let idRows = [{userId, viewId, audioId}];
        let sessionRows =[{recoSession, viewSession, audioSession}];
        let appRows = [{appName, language, clientCfg}];

        this.setState({
            showDrawer: true, idRows, sessionRows, appRows
        });
    };

    async handleRequestClose(e) {
        this.setState({showDrawer: false});
    };

    render() {
        let { classes } = this.props;
        let {
            showDrawer,
            connectionState,
            idColunms,
            idRows,
            sessionColunms,
            sessionRows,
            appColumns,
            appRows
        } = this.state;

        return (
            <div id="connection-state-drawer">
                <Icon id="connection-state-drawer-button" label={"Check Sessions"} color={'white'}
                    onClick={this.handleClickOpen}
                >settings_input_component</Icon>
                <Drawer
                    anchor="top"
                    open={showDrawer}
                    onRequestClose={this.handleRequestClose}
                >
                {
                    this.props.user ?
                    <div id='top-drawer-contaienr' style={styles.containerStyle}
                        tabIndex={0}
                        role="top"
                        onClick={this.handleRequestClose}
                        onKeyDown={this.handleRequestClose}
                    >
                        <Grid
                            columns={idColunms}
                            rows={idRows}
                        >
                            <TableView />
                            <TableHeaderRow />
                        </Grid>
                        <Grid
                            columns={sessionColunms}
                            rows={sessionRows}
                        >
                            <TableView />
                            <TableHeaderRow />
                        </Grid>
                        <Grid
                            columns={appColumns}
                            rows={appRows}
                        >
                            <TableView
                                tableCellTemplate={
                                    ({ style, value, column, classes, children }) => <CustomCell value={value}>{children}</CustomCell>
                                }
                            />
                            <TableHeaderRow />
                        </Grid>
                    </div>
                    :
                    <div id='top-drawer-contaienr' style={styles.containerStyle}
                        tabIndex={0}
                        role="top"
                        onClick={this.handleRequestClose}
                        onKeyDown={this.handleRequestClose}
                    >
                      <div style={styles.loadingStyle}> No User </div>
                    </div>
                }

                </Drawer>
            </div>
        );
    }
}

ConnectionStateDrawer.propTypes = {
    //classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ConnectionStateDrawer);
