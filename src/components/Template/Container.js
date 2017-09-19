import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// ACTIONS
import {exampleAction, undo, redo} from 'actions'

// STORE
function mapStateToProps ({dataReducer: {present}}) {
    let  { values } = present
    return { values }
}

var contain = (Present)  => {
    class Container extends Component {
        static propTypes = {
            // test: PropTypes.boolean,
            values: PropTypes.array,
        }

        static defaultProps = {
            // test: false,
            values: [1,3],
        }

        // CLASS INNER FUNCTIONS
        constructor(props) {
            super(props);
            this._clickListItem = this._clickListItem.bind(this);
        }

        componentWillMount() {}

        componentWillReceiveProps(nextProps) {}

        shouldComponentUpdate(nextProps, nextState) {
            let { values } = this.props;
            let isDifferent =
                values !== nextProps.values || false;

            if(isDifferent) { return true }
            else { return false }
        }

        componentWillUpdate(nextProps, nextState) {}

        render() {
            let {values, dispatch} = this.props;
            return (
                <Present
                    values={values}
                    click={this._clickListItem}
                    undo={() => {dispatch(undo())}}
                    redo={() => {dispatch(redo())}}
                />
            )
        }

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
