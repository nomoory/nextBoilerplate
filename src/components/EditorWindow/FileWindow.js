import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Button from 'material-ui/Button';

import ReactAce from 'react-ace-editor';

import {RESTService} from 'services';

// style
let style = {
    windowContainerStyle: {
        postion: 'relative',
        height: '100%',
        width: '100%',
    },
    textAreaStyle: {
        position: "relative",
        width: '100%',
        height: '100%',
        overflow: 'scroll',
        padding: '0px 6px',
        cursor: 'text',
        border: '0',
        // fontFamily: 'NanumGothicBold'
    },
    buttonStyle: {
        position: 'absolute',
        bottom: '-10px',
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
        let content = this.props.content || this.props.file.content || "";
        this.state = {
            content,
        };
    }

    render() {
        // let {} = this.state;
        let {name, file} = this.props;

        return (
            <div className="window-container" style={style.windowContainerStyle}>
                <style jsx global> {`
                    textarea:focus {
                        outline: none !important;
                    }
                    #file-update-button:hover {
                        bottom: 8px !important;
                        opacity: 0.9 !important;
                    }
                    .ace_print-margin {
                        left: 100% !important;
                    }
                    .ace_content {
                        cursur: none !important;
                    }
                `} </style>
                <ReactAce
                    mode={file.type == "pattern" ? "yaml" : "text"}
                    theme="solarized_light"
                    onChange={this._onChangeAce}
                    style={style.textAreaStyle}
                    value={this.props.content || this.props.file.content}
                    editorProps={{
                        $blockScrolling: Infinity
                    }}
                    ref={instance => { this.ace = instance; }} // Let's put things into scope
                />

                {/*<textarea onChange={this._onChangeTextArea} style={style.textAreaStyle} value={this.props.content || this.props.file.content}/> */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: '10px',
                    opacity: 0.2,
                    userSelect: 'none',
                    zIndex: 1,
                }}>
                    {file.path}
                </div>

                <Button id="file-update-button" raised color="primary" style={style.buttonStyle}
                    onClick={this._onClickUpdateFile}>
                    update
                </Button>
            </div>
        )
    }

    // COMPONENT LIFE CYCLE
    componentWillMount() {}

    componentWillReceiveProps(nextProps) {}

    // shouldComponentUpdate(nextProps, nextState) { return true }

    componentWillUpdate(nextProps, nextState) {}

    componentDidMount() {
        let editor = this.ace.editor;
        editor.setValue( this.props.content || this.props.file.content || "" );
        console.log('editor', editor);
    }


    componentWillUnmount() {}

    // CUSTOM FUNCTIONS
    _onChangeAce = (newValue, e) => {
        let {onChangeTextArea, file} = this.props;
        // console.log(newValue, e);
        const editor = this.ace.editor; // The editor object is from Ace's API
        let content = editor.getValue();
        onChangeTextArea(file.path, content);
    };

    _onClickUpdateFile = (e) => {
        const editor = this.ace.editor; // The editor object is from Ace's API
        let content = editor.getValue();
        let {onChangeTextArea, updateFile, file} = this.props;
        updateFile(content || file.content);
        onChangeTextArea(file.path, "");
    }

}

export default connect(mapStateToProps)(FileWindow);
