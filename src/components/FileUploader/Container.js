import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Dropzone from 'react-dropzone';
import axios from 'axios';

// ACTIONS
// import { } from 'actions'

// STORE
function mapStateToProps ({dataReducer}) {
    //let  { } = dataReducer
    return { }
}

var contain = (Present)  => {
    class Container extends Component {
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
            // You Can Modify
            let presentProps = []; // put props name
            let presentState = ["files"]; // put state name
            let customProps = {}; // Name props with your own value
            let presentFunctions = {
                getDropzone : this._getDropzone,
                handleOnClickButton : this._handleOnClickButton,
                onClickUpdate: this._onClickUpdate
            }; // Put functions with your key name

            return ( // Do not modify!!
                <Present
                    props={{...(_.pick(this.props, presentProps)), ...customProps}}
                    state={_.pick(this.state, presentState)}
                    functions={presentFunctions}
                />
            )
        }

        // COMPONENT LIFE CYCLE
        componentWillMount() {}

        componentWillReceiveProps(nextProps) {}

        shouldComponentUpdate(nextProps, nextState) { return true }

        componentWillUpdate(nextProps, nextState) {}

        componentDidMount() {}

        componentDidUpdate() {}

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
                    { this.state.dropzoneActive && <div id="drop-overlay">Drop effect image files(png or gif)...</div> }
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
        _onClickUpdate = (e) => {
            this.dropzoneRef.onClick(e)
        }
    }

    return connect(mapStateToProps)(Container);
}

export default contain
