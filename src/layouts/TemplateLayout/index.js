import contain from './Container'

// SUBCOMPONENTS
import TemplateComponent from 'components/TemplateComponent'
import TreeView from 'components/TreeView'
import FileUpload from 'components/FileUpload'

var Present = ({ props, state, functions}) => {
    let { } = props;
    let { } = state;
    let { } = functions;

    // STYLE
    let containerStyle = {
        postion: 'relative',
        display: 'block',
        width: '100%',
        height: '100%',
        overflow: 'auto'
    };

    let cssStyle =
    <style jsx>{ // put CSS style here
        `
            #hello-world {
                color: green;
            }
        `
    }</style>

    return (
        <div id='template-layout' style={containerStyle}>
            <div>
                <TemplateComponent/>
            </div>
            <div>
                <FileUpload />
            </div>
        </div>
    )
}

export default contain(Present)
