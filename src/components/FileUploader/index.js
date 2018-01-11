import contain from './Container'

// SUBCOMPONENTS
import UploadZone from './UploadZone'

var Present = ({ props, state, style, functions}) => {
    let { } = props;
    let { } = state;
    let {onDrop} = functions;
    return (
        <div id='file-upload' style={style.mainStyle}>
            <UploadZone />
        </div>
    )
}

export default contain(Present)
