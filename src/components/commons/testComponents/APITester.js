import { Component } from "react";
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import {RESTService} from 'services';

// style
let style = {
    textFieldStyle: {
        width: '500px'
    }
}

// ACTIONS

// STORE
function mapStateToProps ({dataReducer}) {
    let  { values } = dataReducer
    return { values }
}

class PatternEditor extends Component {
    // PROPS SETTING
    static propTypes = {
        node: PropTypes.object,
    }

    static defaultProps = {
    }

    // CLASS INNER FUNCTIONS
    constructor(props) {
        super(props);
        this.state = {
            url: "http://192.168.161.51:8080/test/updatePattern/",
            user: "65132713",
            path: "/server/src/main/resources/",
            fileName: "app.yaml",
            content: `appContext:
  speechActions:
    - speechPattern : "오늘 날씨가 어때"
      intentScript: "MGW { interact 'weather' }"`,
            response: "",
            method: "post",
        };
    }

    render() {
        let {showChildren, showInfo} = this.state;
        let node = this.props;

        return (
            <div className="Node-container" style={style.nodeContainerStyle}>
                <FormControl>
                    <InputLabel htmlFor="method">Method</InputLabel>
                    <Select
                        value={this.state.method}
                        onChange={this._handleChangeSelection}
                        input={<Input name="method" id="method" />}
                    >
                        <MenuItem value={'get'}>GET</MenuItem>
                        <MenuItem value={'post'}>POST</MenuItem>
                        <MenuItem value={'put'}>PUT</MenuItem>
                        <MenuItem value={'delete'}>DELETE</MenuItem>
                    </Select>
                </FormControl>

                <br/>

                <TextField
                    style={style.textFieldStyle}
                  id="url"
                  label="url"
                  value={this.state.url}
                  onChange={this._handleChange('url')}
                />
                <br/>
                <TextField
                style={style.textFieldStyle}
                  id="user"
                  label="user"
                  value={this.state.user}
                  onChange={this._handleChange('user')}
                />
                <br/>

                <TextField
                style={style.textFieldStyle}
                  id="fileName"
                  label="fileName"
                  value={this.state.fileName}
                  onChange={this._handleChange('fileName')}
                />
                <br/>

                <TextField
                style={style.textFieldStyle}
                  id="path"
                  label="path"
                  value={this.state.path}
                  onChange={this._handleChange('path')}
                />
                <br/>

                <TextField
                style={style.textFieldStyle}
                  id="content"
                  label="content"
                  value={this.state.content}
                  onChange={this._handleChange('content')}
                  multiline={true}
                />
                <br/>

                <Button raised onClick={this._onRequest}>
                    Send
                </Button>
                <br/>

                <div> Response : {JSON.stringify(this.state.response)}</div>

            </div>
        )
    }

    // COMPONENT LIFE CYCLE
    componentWillMount() {}

    componentWillReceiveProps(nextProps) {}

    // shouldComponentUpdate(nextProps, nextState) { return true }

    componentWillUpdate(nextProps, nextState) {}

    componentDidMount() {
    }


    componentWillUnmount() {}

    // CUSTOM FUNCTIONS
    _handleChangeSelection = event => {
        this.setState({ method: event.target.value });
    };
    _handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    _onRequest = async (e) => {
        let response = await this._request();
        this.setState({
            response
        })
    }

    _request = () => {
        let {
            url, user, fileName, path, content, method
        } = this.state;
        let params = {
            user,fileName,path,content
        }

        let config = {
            method,
            baseURL: url,
            params
        };
        let response = axios.request(config)
        .then((res) => {
            let response = res.data;
            console.log("success to get response :" + response);
            return response
        }).catch((error) => {return error});

        return response;

    }


}


export default connect(mapStateToProps)(PatternEditor);
