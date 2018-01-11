let staticStyle = {
    mainStyle: {
        width: '100%',
        height: '20%'
    }
}

let getStyleWith = ({values}) => Object.assign({}, staticStyle,
    {
        templateStyle: {
            border: `green solid ${values[0] || 0 }px`
        }
    }
)

export default getStyleWith
