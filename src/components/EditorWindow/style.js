
let staticStyle = {
    containerStyle: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    tapsStyle: {
        display: 'flex',
        flexDirection: 'row',
        flex: '0 0 24px',
        width: 'auto',
        fontSize: '12px',
    },
    windowStyle: {
        position: 'relative',
        width: '100%',
        flex: '1 1',
    },
    loadingStyle:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        color: '#999999'
    }
};

let getStyleWith = ({}) => Object.assign({}, staticStyle,
    {
        templateStyle: {
            border: `green solid ${0 }px`
        }
    }
)

export default getStyleWith
