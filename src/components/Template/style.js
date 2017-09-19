export default `

    #template h1 {
        color: red
    }

    #__next {
        border: green solid 2px;
    }

    #template {
        border: red solid 1px;
        color: red;
    }

`

export let dynamicStyle = ({values}) => ({
    templateStyle: {
        border: `green solid ${values[0]}px`
    }
})

// Second Candidate : https://www.npmjs.com/package/babel-plugin-css-in-js
// const style = (props) => {
//     let {value} = props;
//     return cssInJS({
//         myButton: {
//             border: 'solid 1px #ccc',
//             backgroundColor: 'lightgray',
//             display: 'inline-block'
//         },
//
//         myInput: {
//             width: props.value,
//             // ... etc.
//         }
//     })
// } // 매 렌더시마다 연산을 하는데 성능 문제가 없을까? -> 이동이나 Resize 땐 render 안되니까 지금과 별 차이 없을 듯함
