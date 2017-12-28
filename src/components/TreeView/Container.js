import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {RESTService} from 'services';

// style
import getStyleWith from './style';

// Demo Data
import demoData from './demoData'

// ACTIONS
import { } from 'actions'

// STORE
function mapStateToProps ({dataReducer}) {
    let  {  } = dataReducer;
    return {  }
}

var contain = (Present)  => {
    class Container extends Component {
        // PROPS SETTING
        static propTypes = {
        }

        static defaultProps = {
        }

        // CLASS INNER FUNCTIONS
        constructor(props) {
            super(props);
            this.state = {
            };
        }

        render() {
            let style = getStyleWith(this.props)
            let presentProps = ["data"];
            let presentState = [];
            let customProps = {
                demoData
            };
            let presentFunctions = {
                onClickFile: this._onClickFile
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
        _onClickFile = (path, name) => { return  (e) => {

        }}
    }

    return connect(mapStateToProps)(Container);
}

export default contain
