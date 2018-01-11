import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Editor, EditorState, ContentState, RichUtils, Modifier} from 'draft-js';
import ButtonBase from 'material-ui/ButtonBase';

import {RESTService} from 'services';
import Tooltip from 'material-ui/Tooltip';
// style
let style = {
    tapStyle: {
        position: 'relative',
        flex: '0 1 80px',
        paddingTop: '2px',
        paddingLeft: '8px',
        userSelect: 'none',
        cursor: 'default',
        overflow: 'visible',
        minWidth: '30px',
        borderRadius: '5px 5px 0px 0px',

    },
    buttonContainerStyle: {
        position: 'absolute',
        backgroundColor: 'white',
        right: '2px',
        top: '2px',
        width: '16px',
        height: '16px',
        borderRadius: '4px',
    },
    exitButtonStyle: {
        fontSize: '16px',
    },
}

// ACTIONS

// STORE
function mapStateToProps ({dataReducer}) {
    // let  {  } = dataReducer;
    return { };
}

class Tab extends Component {
    // PROPS SETTING
    static propTypes = {
    }

    static defaultProps = {
    }

    // CLASS INNER FUNCTIONS
    constructor(props) {
        super(props);
        this.state = {
            showExit: false,
        };
    }

    render() {
        // let {} = this.state;
        let {name, file, isSelected, onClickTab, onClickCloseTab} = this.props;
        let {showExit} = this.state;
        let {type, path} = file;

        return (
            <div key={path} className={isSelected? "tab selected-tab" : "tab"} style={style.tapStyle}
                onClick={onClickTab(path)}
                onMouseOver={(e)=>{this.setState({showExit: true})}}
                onMouseLeave={(e)=>{this.setState({showExit: false})}}
            >
                <Tooltip title={name.split('.')[1]} placement="bottom-start" enterDelay="500" style={{fontSize:'15px'}} >
                    <div className='file-tap' style={{overflow: 'hidden', textOverflow:'ellipsis'}}  >
                        {name}
                    </div>
                </Tooltip>
                {
                    showExit ?
                    <ButtonBase className="tab-exit" style={style.buttonContainerStyle} onClick={onClickCloseTab(path)}>
                        <i className="material-icons" style={style.exitButtonStyle}>
                            clear
                        </i>
                    </ButtonBase>
                    : null
                }
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

}


export default connect(mapStateToProps)(Tab);
