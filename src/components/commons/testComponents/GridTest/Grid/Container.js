import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

// style
import getStyleWith from './style';

// ACTIONS
import {exampleAction, undo, redo} from 'actions'

// STORE
function mapStateToProps ({dataReducer}) {
    let  { values } = dataReducer
    return { values }
}

var contain = (Present)  => {
    class Container extends Component {
        // PROPS SETTING
        static propTypes = {
            values: PropTypes.array,
        }

        static defaultProps = {
            values: [1,3],
        }

        // CLASS INNER FUNCTIONS
        constructor(props) {
            super(props);
            this.state = {url: ""};
            this._clickListItem = this._clickListItem.bind(this);
            this.value = 1;
        }

        render() {
            let style = getStyleWith(this.props) // Do not modify!!
            let presentState = ['url'];
            let presentProps = ['values'];
            let customProps = {customValue: this.value};
            let presentFunctions = {
                undo: () => {dispatch(undo())},
                redo: () => {dispatch(redo())},
                click: this._clickListItem,
                handleChange: name => event => {
                    this.setState({
                        [name]: event.target.value,
                    });
                }
            }

            return (  // Do not modify!!
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
        _clickListItem(e) {
            let target = e.target;
            this.props.dispatch(exampleAction({id:target.id}))
        }
    }

    return connect(mapStateToProps)(Container);
}

export default contain
