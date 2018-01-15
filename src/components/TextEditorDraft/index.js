import { Component } from "react";
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import {Editor, EditorState, ContentState, RichUtils, Modifier} from 'draft-js';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import {AjaxService} from 'services';

// style
let style = {
    mainContainerStyle: {
        position: "relative",
        margin: '10px',
        display: 'flex',
        flexDirection: 'row',
        height: '47%',
    },
    headerStyle: {
        height: '40px',
        fontSize: '24px'
    },
    contentStyle: {
        display: "flex",
        flexDirection: 'column',
        flex: '0 0 250px',
        padding: '20px'
    },
    requestSettingStyle: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 0'
    },
    patternTextfieldsStyle: {
        flex: '1',
    },
    patternButtonsStyle: {
        flex: '0 0 30px',
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    textAreaStyle: {
        flex: '2 2 0',
        overflow: 'scroll',
        cursor: 'text'
    },
}

// ACTIONS

// STORE
function mapStateToProps ({dataReducer}) {
    let  { user } = dataReducer
    return { user }
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
            editorState: EditorState.createWithContent(ContentState.createFromText('')),
            user: props.user,
            path: "/contexts/cjhv/KO_KR/",
            fileName: "global.yaml",
        };
    }


    render() {
        let {showChildren, showInfo, fileName} = this.state;
        let {user} = this.props;

        return (
            <Paper className="pattern-editor-container" style={style.mainContainerStyle}>
                <Paper style={style.contentStyle}>
                    <div style={style.requestSettingStyle}>
                        <div style={style.headerStyle}> Pattern </div>
                        <div id="pattern-textfield" style={style.patternTextfieldsStyle}>
                            <TextField
                            style={{width: "100%"}}
                              id="user"
                              label="user"
                              value={this.state.user}
                              onChange={this._handleChange('user')}
                            />

                            <TextField
                                style={{width: "100%"}}
                                id="path"
                                label="path from resources directory"
                                value={this.state.path}
                                onChange={this._handleChange('path')}
                            />

                            <TextField
                            style={{width: "100%"}}
                              id="fileName"
                              label="fileName"
                              value={this.state.fileName}
                              onChange={this._handleChange('fileName')}
                            />
                        </div>
                        <div id='pattern-buttons' style={style.patternButtonsStyle}>
                            <Button raised onClick={this._onRequest}>
                                Send
                            </Button>
                            <Button raised onClick={this._getPattern}>
                                Get
                            </Button>
                        </div>
                    </div>
                </Paper>
                <div
                    style={style.textAreaStyle}
                    onClick= {(e) => {
                        this.domEditor.focus()
                    }}
                    >
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this._onChangeTextArea}
                        placeholder="Put your patterns..."
                        onTab={this._handleTab}
                        ref={ref => this.domEditor = ref}
                    />
                </div>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: '10px',
                    opacity: 0.2,
                    userSelect: 'none'
                }}> {fileName} </div>
            </Paper>
        )
    }

    // COMPONENT LIFE CYCLE
    componentWillMount() {
        this._getPattern()
    }


    // shouldComponentUpdate(nextProps, nextState) { return true }

    componentWillReceiveProps(nextProps) {
        this._getPattern()
      this.setState({
        user: nextProps.user,
      })
    }

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
        let { user, fileName, path, editorState } = this.state;
        let params = { user, fileName, path };

      let config = {
          method: 'post',
          baseURL: "http://192.168.161.51:8080/test/updatePattern/",
          params,
          data:{
              content:editorState.getCurrentContent().getPlainText(),
          }
      };
      let response = await axios.request(config)
      .then((res) => {
          let response = res.data;
          console.log("success to get response :" + response);
          return response
      }).catch((error) => {return error});

        this.setState({
            response
        })
    }

    _getPattern = async () => {
      let {
          user, fileName, path, editorState
      } = this.state;
      let params = {
          user,
          fileName,
          path,
      }

      let config = {
          method: 'get',
          baseURL: "http://192.168.161.51:8080/test/readPattern/",
          params
      };

      let content = await axios.request(config)
      .then((res) => {
          let content = res.data;
          console.log("success to get content :" + content);
          return content
      }).catch((error) => {return error});

      this.setState({
          editorState: EditorState.createWithContent(ContentState.createFromText(content))
      })

    }

    _onClickGetPattern = (e) => {
        this._getPattern();
    }

    _onChangeTextArea = (editorState) => {
      this.setState({editorState})
    };

    _handleTab = (e) => {
      e.preventDefault();
      const tabCharacter = "    ";
      let currentState = this.state.editorState;
      let newContentState = Modifier.replaceText(
        currentState.getCurrentContent(),
        currentState.getSelection(),
        tabCharacter
      );

      this.setState({
        editorState: EditorState.push(currentState, newContentState, 'insert-characters')
      });
    }

}


export default connect(mapStateToProps)(PatternEditor);
