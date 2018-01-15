import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {AjaxService} from 'services';

// style
let fontSize = '20px';
let style = {
    nodeContainerStyle: {
        position: 'relative',
        display: 'block',
        userSelect: 'none',
    },
    contentContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        cursor: 'default',
        padding: "2px 0",
        color: '#444444',
        transition: 'all 1s'
    },
    contentNameStyle: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: '14px',
        paddingLeft: '8px',
    },
    childrenContainerStyle: {
        position: 'relative',
        paddingLeft: fontSize,
    },
}

// ACTIONS

// STORE
function mapStateToProps ({dataReducer}) {
    let  { user } = dataReducer;
    return { user };
}

class Node extends Component {
    // PROPS SETTING
    static propTypes = {
        // user: PropTypes.String,
        // content: PropTypes.object,
    }

    static defaultProps = {
    }

    // CLASS INNER FUNCTIONS
    constructor(props) {
        super(props);
        this.state = {
            showChildren: false,
        };
    }

    render() {
        let {showChildren} = this.state;
        let {content, onClickFile} = this.props;
        let {type, name, files, directories, path} = content;

        let isFile = type == 'file';
        let isEmpty ;
        if( files && directories) {
            isEmpty = !(files.length + directories.length);
        };

        return (
            <div className="node-container" style={style.nodeContainerStyle}>
                <div className="content-container" style={style.contentContainerStyle}
                    onClick= {isFile ? onClickFile(path, name) : this._onClickDirectory}
                    onMouseDown={(e) => {
                        e.currentTarget.style.backgroundColor ='rgb(63, 81, 181)'
                        e.currentTarget.style.transition ='all 0.4s';}}
                    onMouseUp={(e) => {
                        e.currentTarget.style.backgroundColor ='';
                        e.currentTarget.style.transition ='all 2s';
                    }}
                >
                    <i className="material-icons" style={{fontSize}}>
                        { isFile || isEmpty ?
                        null : ( showChildren ? 'expand_more':'chevron_right') }
                    </i>
                    <i className="material-icons" style={{fontSize}}>
                        {isFile ? "description" : "folder" }
                    </i>
                    <span className="content-name" style={style.contentNameStyle}>
                        {name}
                    </span>
                </div>
                <div className="children-container" style={style.childrenContainerStyle}>
                    {
                        showChildren && type == 'directory' ?
                        this._showChildren(directories, files) :
                        null
                    }
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
    _showChildren = (directories=[], files=[]) => {
        let {content, onClickFile} = this.props;
        let list = [];
        directories.map((directory) => {
            list.push(<Node key={directory.id} content={directory} onClickFile={onClickFile} />);
        })
        files.map((file) => {
            list.push(<Node key={file.id} content={file} onClickFile={onClickFile}/>);
        })

        return list
    }

    _onClickDirectory = (e) => {
        let {showChildren} = this.state;
        this.setState({showChildren: !showChildren});
    }
}


export default connect(mapStateToProps)(Node);
