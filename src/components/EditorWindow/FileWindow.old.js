import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Editor, EditorState, ContentState, RichUtils, Modifier} from 'draft-js';
import Button from 'material-ui/Button';

import {AjaxService} from 'services';
// style
let style = {
    windowContainerStyle: {
        height: '100%'
    },
    textAreaStyle: {
        height: '100%',
        overflow: 'scroll',
        paddingLeft: '5px',
        cursor: 'text'
    },
    buttonStyle: {
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        opacity: 0.5,
        transition: 'all 0.6s',
    }
}

// ACTIONS

// STORE
function mapStateToProps ({dataReducer}) {
    // let  {  } = dataReducer;
    return { };
}

class FileWindow extends Component {
    // PROPS SETTING
    static propTypes = {
        // name: PropTypes.String,
        // file: PropTypes.object
    }

    static defaultProps = {
    }

    // CLASS INNER FUNCTIONS
    constructor(props) {
        super(props);
        console.log(this.props.file);
        let content = this.props.file.content || "";
        this.state = {
            editorState: EditorState.createWithContent(ContentState.createFromText(content)),
        };
    }

    render() {
        // let {} = this.state;
        let {name, file} = this.props;

        return (
            <div className="window-container" style={style.windowContainerStyle}>
                <div
                    style={style.textAreaStyle}
                    onClick= {(e) => {
                        this.domEditor.focus()
                    }}
                    >
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this._onChangeTextArea}
                        placeholder={"Put your "+ file.type +"..."}
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
                }}>
                    {file.path}
                </div>
                <Button raised color="primary" style={style.buttonStyle}
                    onClick={this._onClickUpdateFile}
                    onMouseOver={(e)=>{
                        e.currentTarget.style.bottom = '35px';
                        e.currentTarget.style.opacity = '0.9';}}
                    onMouseLeave={(e)=>{
                        e.currentTarget.style.bottom = '10px'
                        e.currentTarget.style.opacity = '0.5';}}>
                    update
                </Button>
            </div>
        )
    }

    // COMPONENT LIFE CYCLE
    componentWillMount() {}

    componentWillReceiveProps(nextProps) {
        let content = nextProps.file.content || "";
        this.setState({
            editorState: EditorState.createWithContent(ContentState.createFromText(content)),
        })
    }

    // shouldComponentUpdate(nextProps, nextState) { return true }

    componentWillUpdate(nextProps, nextState) {}

    componentDidMount() {}


    componentWillUnmount() {}

    // CUSTOM FUNCTIONS
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

    _onClickUpdateFile = (e) => {
        let content = this.state.editorState.getCurrentContent().getPlainText();
        this.props.updateFile(content);
    }

}


export default connect(mapStateToProps)(FileWindow);
