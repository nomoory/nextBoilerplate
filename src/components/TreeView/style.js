
let staticStyle = {
    containerStyle:{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },
    headerStyle:{
        display: 'flex',
        width: 'auto',
        flex: '0 0 24px',
        fontSize: '14px',
        paddingTop: '2px',
        paddingLeft: '10px',
        textOverflow: 'ellipsis'
    },
    contentStyle:{
        width: '100%',
        flex: '1 1 auto',
    }
}

let getStyleWith = ({}) => Object.assign({}, staticStyle,
    {
        templateStyle: {
            border: `green solid ${0 }px`
        }
    }
)

export default getStyleWith
