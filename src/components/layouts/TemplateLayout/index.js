import contain from './Container';

// SUBCOMPONENTS
import TemplateComponent from 'components/TemplateComponent';
import TreeView from 'components/TreeView';

var Present = ({ props, state, style, functions}) => {
    let { } = props;
    let { } = state;
    let { } = functions;
    return (
        <div id='template-layout' style={style.mainStyle}>
            <TemplateComponent/>
            <TreeView data={null}/>
        </div>
    )
}

export default contain(Present)
