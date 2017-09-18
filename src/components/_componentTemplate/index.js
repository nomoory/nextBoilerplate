import { Component } from "react";
import { connect } from 'react-redux';
import Present from "./Present";
// style
import style from './style';

// ACTIONS
import {exampleAction, undo, redo} from '../../actions'

// STORE
function mapStateToProps ({dataReducer}){
    let { values } = dataReducer.present;;
    return { values }
}


class ComponentTemplateContainer extends Component {
    constructor(props) {
        super(props);
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
        let {values, dispatch} = this.props;

        return <Present values={values}
                    click={this._clickListItem}
                    undo={() => {dispatch(undo())}}
                    redo={() => {dispatch(redo())}} />;
    }

    _clickListItem(e) {
        let target = e.target;
        this.props.dispatch(exampleAction({id:target.id}))
    }
}

export default connect(mapStateToProps)(ComponentTemplateContainer);
