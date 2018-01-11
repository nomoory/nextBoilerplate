import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

var CustomIcon = (props) => {
    let {children, size, fontSize, color, onClick, label, id} = props;

    let style = {
        iconContainerStyle: {
            cursor: "default",
            position: "relative",
            width: size || '54px',
            height: size || '54px',
        },
        iconStyle: {
            fontSize: fontSize || '24px',
            color: color || 'black',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    return (
        <div style={style.iconContainerStyle}
            onClick={onClick}>
            <Tooltip title={label} enterDelay={!!label ? 0: 5000 }>
                <i id={id||null} className="material-icons" style={style.iconStyle}>
                {children} </i>
            </Tooltip>
        </div>
    )
}

export default CustomIcon
