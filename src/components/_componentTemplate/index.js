import { Component } from "react";
import { connect } from 'react-redux';
import Present from "./Present";

// ACTIONS
import {exampleAction} from '../../actions'

// STORE
function mapStateToProps ({dataReducer}){
    let { values } = dataReducer;
    return { values }
}


class ComponentTemplateContainer extends Component {
    constructor() {
        super();
        this._clickListItem = this._clickListItem.bind(this);
    }

    shouldComponentUpdate(nextProps){
        let { values } = this.props;
        let isDifferent =
            values !== nextProps.values || false;

        if(isDifferent) { return true }
        else { return false }
    }

    componentDidMount() {
    }

    render() {
        let {values} = this.props;

        return <Present values={values} click={this._clickListItem} />;
    }

    _clickListItem(e) {
        let target = e.target;
        this.props.dispatch(exampleAction({id:target.id}))
    }
}

export default connect(mapStateToProps)(ComponentTemplateContainer);
