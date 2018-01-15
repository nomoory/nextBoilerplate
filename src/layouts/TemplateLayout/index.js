import contain from './Container'

// SUBCOMPONENTS
import TemplateComponent from 'components/TemplateComponent'
import TreeView from 'components/TreeView'
import FileUploader from 'components/FileUploader'

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
                <FileUploader />
            </div>
        </div>
    )
}

export default contain(Present)
