import { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

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

class TemplateComponent extends Component {
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

        return (
            <div className="template-component-container" style={style.templateComponentContainerStyle}>
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


export default connect(mapStateToProps)(TemplateComponent);
