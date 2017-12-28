let border = '#dddddd solid 0.5px';
let staticStyle = {
    mainStyle: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        border,
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
