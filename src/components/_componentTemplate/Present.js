import style from './style';

export default ({values, click}) => {
    return (
        <div id='component'>
            {style}
            <ul>
                {values.map((value, index) =>
                    <li id={index} key={index} onClick={click}>{value}</li>
                )}
            </ul>
        </div>
    )
}
