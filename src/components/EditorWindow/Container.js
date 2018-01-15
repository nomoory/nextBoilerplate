import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {AjaxService} from 'services';
import update from 'immutability-helper';

// style
import getStyleWith from './style';

// ACTIONS
import { updateFileList,  deleteFileInList, updateSelectedFilePath } from 'actions'

// STORE
function mapStateToProps ({dataReducer}) {
    let  {fileList, user, selectedFilePath} = dataReducer;
    return {fileList, user, selectedFilePath}
}

var contain = (Present)  => {
    class Container extends Component {
        // PROPS SETTING
        static propTypes = {
            fileList: PropTypes.object,
            selectedFilePath: PropTypes.string,
        }

        static defaultProps = {
            fileList: {},
            selectedFilePath:""
        }

        // CLASS INNER FUNCTIONS
        constructor(props) {
            super(props);
            this.state = {
                fileList: {},
                fileContentList: {}
            };
        }

        render() {
            let style = getStyleWith(this.props)
            let presentProps = ['fileList', 'selectedFilePath'];
            let presentState = ['fileContentList'];
            let customProps = {};
            let presentFunctions = {
                onClickTab: this._onClickTab,
                onClickCloseTab: this._onClickCloseTab,
                updateFile: this._updateFile,
                onChangeTextArea: this._onChangeTextArea
            }

            return (
                <Present
                    props={{...(_.pick(this.props, presentProps)), ...customProps}}
                    state={_.pick(this.state, presentState)}
                    style={style}
                    functions={presentFunctions}
                />
            )
        }

        // COMPONENT LIFE CYCLE
        componentWillMount() {}

        componentWillReceiveProps(nextProps) {}

        // shouldComponentUpdate(nextProps, nextState) { return true }

        componentWillUpdate(nextProps, nextState) {}

        componentDidMount() {}

        componentDidUpdate() {}

        componentWillUnmount() {}

        // CUSTOM FUNCTIONS
        _onClickTab = (selectedFilePath) => (e) => {
            this.props.dispatch(updateSelectedFilePath(selectedFilePath));
        }

        _onClickCloseTab = (filePath) => (e) => {
            e.stopPropagation();
            this.props.dispatch(deleteFileInList(filePath));
        }

        _onChangeTextArea = (path, content) => {
            let newState = update( this.state, {
                fileContentList: {
                    [path] : {$set: content}
                }
            });
            this.setState(newState);
        }

        _updateFile = (content) => {
            let user = this.props.user;
            let file = this.props.fileList[this.props.selectedFilePath];
            let {name, path} = file;
            let dividedName = name.split('.');
            let fileName = dividedName[0] || "";
            let extension = dividedName[1];
            let dividedPath = path.split('/');
            let variant = dividedPath[2];
            let language = dividedPath[3];
            let appName = dividedPath[4] || "";
            if( extension == "yaml") {
                let params = { user, extension, variant, language, appName, content,
                    name: fileName,
                }
                // 해당 file에 대한 내용 요청
                AjaxService.updateYaml(params).then((content) => {
                    let params = {
                        name, path, type: 'pattern', content
                    }
                    this.props.dispatch(updateFileList(params));
                });
            } else if( extension == "entity") {
                let params = { user, name: fileName, content };
                AjaxService.updateEntity(params).then((content) => {
                    let params = {
                        name, path, type: 'entity', content
                    }
                    this.props.dispatch(updateFileList(params));
                });
            }
        }
    }

    return connect(mapStateToProps)(Container);
}

export default contain
