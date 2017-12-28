let staticStyle = {
    mainStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
}

let getStyleWith = (styleProps) => {
    let dynamicStyle = {
        someStyle: {
            border: `green solid ${styleProps || 0 }px`
        }
    }
    return Object.assign(staticStyle, dynamicStyle)
}

export default getStyleWith
