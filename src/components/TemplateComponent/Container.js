import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

// STYLE
import getStyleWith from './style';

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
            this.state = {};
            // this.props.dispatch();
        }

        render() {
            let style = getStyleWith(this.props) // Do not modify!!

            // You Can Modify
            let presentProps = ['children']; // put props name
            let presentState = []; // put state name
            let customProps = {}; // Name props with your own value
            let presentFunctions = {}; // Put functions with your key name

            return ( // Do not modify!!
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

        shouldComponentUpdate(nextProps, nextState) { return true }

        componentWillUpdate(nextProps, nextState) {}

        componentDidMount() {}

        componentDidUpdate() {}

        componentWillUnmount() {}

        // CUSTOM FUNCTIONS
        // _clickButton(e) {}
    }

    return connect(mapStateToProps)(Container);
}

export default contain
