const borderLeft = '#dddddd solid 0.3px';

let staticStyle = {
    mainStyle: {
        postion: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'auto'
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
