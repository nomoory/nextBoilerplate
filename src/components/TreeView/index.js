import contain from './Container';

// SUBCOMPONENTS
import Node from './Node';

var Present = ({ props, state, style, functions}) => {
    let {data, demoData} = props;
    let {} = state;
    let {onClickFile} = functions;
    let content = data || demoData;
    return (
        <div id='context-tree-view-container' style={style.containerStyle}>
            <div id="tree-view-header" style={style.headerStyle}>
                Tree View
            </div>
            <div id="tree-view-content" style={style.contentStyle}>
                <Node key={content.id} content={content} onClickFile={onClickFile} />
            </div>
        </div>
    )
}

export default contain(Present)
