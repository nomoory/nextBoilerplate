import contain from './Container'

// style
import style, { dynamicStyle } from './style';

var Template = ({values, undo, redo, click}) => {
    let { templateStyle } = dynamicStyle({values});
    return (
        <div id='template' style={templateStyle}>
            <style jsx> {style} </style>
            <ul>
                {
                    values.map( (value, index) =>
                        <li id={index} onClick={click}>{value}</li>
                    )
                }
            </ul>
            <div onClick={undo}> undo </div>
            <div onClick={redo}> redo </div>
        </div>
    )
}

export default contain(Template)
