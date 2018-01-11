import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import axios from 'axios';

import Dropzone from 'react-dropzone';

// style
let style = {
    templateComponentContainerStyle: {

    },
    dropOverlay : {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        padding: '2.5em 0',
        background: 'rgba(219,219,219,0.1)',
        textAlign: 'center',
        color: '#fff',
    }
}

// ACTIONS

// STORE
function mapStateToProps ({dataReducer}) {
    let  { } = dataReducer;
    return { };
}

class UploadZone extends Component {
    // PROPS SETTING
    static propTypes = {
        // test: PropTypes.boolean,
    }

    static defaultProps = {
        // test: false,
    }

    // CLASS INNER FUNCTIONS
    constructor(props) {
        super(props);
        this.state = {
            files:[],
            dropzoneActive: false
        };
        // this.props.dispatch();
    }

    render() {
        return (
            <div className="template-component-container" style={style.templateComponentContainerStyle}>
                <div onClick={(e) => {this.dropzoneRef.onClick(e)}}>upload</div>
                <div onClick={this._handleOnClickButton}>send</div>
                <div>
                  {
                      this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                  }
                  {this._getDropzone()}
                </div>
            </div>
        )
    }

    // COMPONENT LIFE CYCLE
    componentWillMount() {}

    componentWillReceiveProps(nextProps) {}

    // shouldComponentUpdate(nextProps, nextState) { return true }

    componentWillUpdate(nextProps, nextState) {}

    componentDidMount() {}


    componentWillUnmount() {}

    // CUSTOM FUNCTIONS
    _getDropzone = () => {
        let view = (
            <Dropzone
                className="effect_dropzone"
                ref={(node) => { this.dropzoneRef = node; }}
                style={{
                    position: "absolute",
                    width : '100%',
                    height : '100%',
                    zIndex: 1
                }}
                accept="image/png, image/gif, image/jpeg"
                onDrop={this._onDrop}
                onDragEnter={this._onEnter}
                onDragLeave={this._onLeave}>
                { this.state.dropzoneActive && <div style={style.dropOverlay}>Drop effect image files(png or gif)...</div> }
            </Dropzone>
        );

        return view;
    }

    _onDrop = (accepted, rejected) => {
        let files = accepted;
        // In case, new files has same file Name
        let newFiles = Object.assign(this.state.files);
        for (let file of files) {
            let hasSameName = false;
            this.state.files.map((stateFile, index) => {
                if(stateFile.name == file.name) {
                    newFiles[index] = file;
                    hasSameName = true;
                }
            });
            if(!hasSameName){
                newFiles.push(file);
            }
        }
        this.setState({ files: newFiles, dropzoneActive: false });
    }

    _onEnter= (e) => {
        this.setState({
            dropzoneActive: true
        });
    }

    _onDragLeave = (e) => {
        this.setState({
            dropzoneActive: false
        });
    }

    _handleOnClickButton = (e) => {
        // Fileupload
        let data = new FormData();
        for (let file of this.state.files) {
            data.append('file', file, file.name);
        }

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        return axios.post('/api/upload', data, config);
    }
}


export default connect(mapStateToProps)(UploadZone);
