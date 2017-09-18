import style from './style';

export default ({values, undo, redo, click}) => {
    console.log (values)
    return (
        <div id='component'>
            {style}
            <ul>
                {values.map((value, index) => {
                    debugger
                    return <li id={index} onClick={click}>{value}</li>
                    }
                )}
            </ul>
            <div onClick={undo}> undo </div>
            <div onClick={redo}> redo </div>
        </div>
    )
}
