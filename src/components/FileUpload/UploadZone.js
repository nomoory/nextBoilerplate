import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import axios from 'axios';

import Dropzone from 'react-dropzone';

// style
let style = {
    templateComponentContainerStyle: {

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
        };
        // this.props.dispatch();
    }

    render() {
        return (
            <div className="template-component-container" style={style.templateComponentContainerStyle}>
                <section style={{position: 'relative'}}>
                    <div className="dropzone">
                        <Dropzone ref={(node) => { this.dropzoneRef = node; }}
                          style={{width:"100%", height:"100px"}}
                          onDrop={this._onDrop}
                          >
                          <p>Try dropping some files here, or click to select files to upload.</p>
                        </Dropzone>
                    </div>
                    <aside style={{position: 'absolute', left: 0, top:0}}>
                        <ul>
                          {
                            this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                          }
                        </ul>
                    </aside>
                </section>
                <div onClick={this._handleOnClickButton}>send</div>
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
    _onDrop = (files) => {
        this.setState({ files })
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
