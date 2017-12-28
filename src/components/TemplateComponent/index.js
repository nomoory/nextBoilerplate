import contain from './Container'

// SUBCOMPONENTS

var Present = ({ props, state, style, functions}) => {
    let { } = props;
    let { } = state;
    let { } = functions;
    return (
        <div id='admin-console-container' style={style.mainStyle}>
            This is Template Component.
        </div>
    )
}

export default contain(Present)
