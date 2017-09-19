export default `

    #template h1 {
        color: red
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
