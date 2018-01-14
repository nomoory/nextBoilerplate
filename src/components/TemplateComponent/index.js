import contain from './Container'

// SUBCOMPONENTS

var Present = ({ props, state, functions}) => {
    let { } = props;
    let { } = state;
    let { } = functions;

    // STYLE
    let containerStyle = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        border: '#dddddd solid 0.5px',
    };

    let cssStyle =
    <style jsx>{ // put CSS style here
        `
            #hello-world {
                color: green;
            }
        `
    }</style>

    //CONTENT
    return (
        <div id='template-container' style={containerStyle}>
            {cssStyle}
            <div id="hello-world"> hello world. </div>
        </div>
    )
}

export default contain(Present)
