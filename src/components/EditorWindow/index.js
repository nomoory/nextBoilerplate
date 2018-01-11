import contain from './Container';

// SUBCOMPONENTS
import Icon from 'components/commons/Icon';
import Tab from './Tab';
import FileWindow from './FileWindow';

import dynamic from 'next/dynamic'

var Present = ({ props, state, style, functions}) => {
    let { fileList, selectedFilePath } = props;
    let { fileContentList } = state;
    let { onClickTab, onClickCloseTab, updateFile, onChangeTextArea } = functions;
    let taps = [];
    let fileElements = [];
    let hasFile = !!Object.keys(fileList).length
    for(let filePath in fileList) {
        let file = fileList[filePath];
        let {name, path, type, content} = file;
        let isSelected = selectedFilePath == filePath;
        taps.push(
            <Tab key={filePath} name={name} file={file} isSelected={isSelected}
                onClickTab={onClickTab}
                onClickCloseTab={onClickCloseTab}/>
        );
    }
    let selectedFile = fileList[selectedFilePath];
    let content = fileContentList[selectedFilePath];

    return (
        hasFile ?
        <div id='context-tree-view-container' style={style.containerStyle}>
            <div id="taps" style={style.tapsStyle}>
                {taps}
                <div id="tap-spare-space" className='border-line' style={{flex: 1}}></div>
            </div>
            <div id="file-window" style={style.windowStyle}>
                {
                    selectedFilePath ?
                    <FileWindow
                        key={selectedFile.path}
                        name={selectedFile.name}
                        file={selectedFile}
                        content={content}
                        updateFile={updateFile}
                        onChangeTextArea={onChangeTextArea}
                    />
                    : null
                }
            </div>
        </div> :
        <div id="empty-window-container" style={style.containerStyle}>
            <div style={style.loadingStyle}> Click File on Tree View </div>
        </div>
    )
}

function makeKey(name) { return name + '_' +Math.floor(1+Math.random())*0x10000 }

export default contain(Present)
