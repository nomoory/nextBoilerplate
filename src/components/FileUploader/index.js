import contain from './Container'

// SUBCOMPONENTS
import UploadZone from './UploadZone'

var Present = ({ props, state, functions}) => {
    let { } = props;
    let { files } = state;
    let {getDropzone, handleOnClickButton,onClickUpdate} = functions;
    let mainStyle = {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        border: '#dddddd solid 0.5px',
    }

    let cssStyle = (<style jsx>
        {`
            #drop-overlay {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                padding: 2.5em 0;
                background: rgba(219,219,219,0.1)';
                text-align: center;
                color: #fff;
            }
        `}
    </style>)

    return (
        <div id='file-upload' style={mainStyle}>
            {cssStyle}
            <div id="upload-button" onClick={onClickUpdate}>upload</div>
            <div onClick={handleOnClickButton}>send</div>
            <div>
                {
                    files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
                {getDropzone()}
            </div>
        </div>
    )
}

export default contain(Present)
