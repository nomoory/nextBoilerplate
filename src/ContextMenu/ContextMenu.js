import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

const style = {
  display: 'inline-block',
};

class ContextMenu extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false,
        };
        this._handleContextMenu = this._handleContextMenu.bind(this);
        this._handleContextMenuOnWindow = this._handleContextMenuOnWindow.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this._handleScroll = this._handleScroll.bind(this);
    }

    componentDidMount() {
        window.oncontextmenu = () => {
            return false;     // cancel default menu
        }
        document.addEventListener('contextmenu', this._handleContextMenu);
        window.addEventListener('contextmenu', this._handleContextMenuOnWindow);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll, true);
    };

    componentWillUnmount() {
        document.removeEventListener('contextmenu', this._handleContextMenu);
        window.removeEventListener('contextmenu', this._handleContextMenuOnWindow);
        document.removeEventListener('click', this._handleClick);
        document.removeEventListener('scroll', this._handleClick);
    }

    _handleContextMenuOnWindow(event) { // contextmenu 이벤트를 갖지 않은 나머지 영역에서 우클릭을 할 시

        if(this.state.visible){
            // contextmenu 사라짐
            this.setState({visible: false});
            // 선택 element 없앰
            this.props.dispatch(unselect());
        }
    }

    _handleContextMenu(event) {
        event.preventDefault();
        console.log('clicked');

        this.setState({ visible: true });

        this.clickX = event.clientX;
        this.clickY = event.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = this.root.offsetWidth;
        const rootH = this.root.offsetHeight;

        const right = (screenW - this.clickX) > rootW;
        const left = !right;
        const top = (screenH - this.clickY) > rootH;
        const bottom = !top;

        if (right) {
            this.root.style.left = `${this.clickX + 5}px`;
        }

        if (left) {
            this.root.style.left = `${this.clickX - rootW - 5}px`;
        }

        if (top) {
            this.root.style.top = `${this.clickY + 5}px`;
        }

        if (bottom) {
            this.root.style.top = `${this.clickY - rootH - 5}px`;
        }
    };

    _handleClick(event) {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);

        if (/*wasOutside &&*/ visible) {
            this.setState({ visible: false, });
            //this.props.dispatch(unselect());
        }
    }

    _handleScroll(event) {
        const { visible } = this.state;

        if (visible) {
            this.setState({ visible: false, });
        }
    }

    render() {
        const { selectedComponentType, selectedComponent, contextMenuItemList } = this.props;
        const { visible } = this.state;

        return  visible &&
            <div ref={ref => {this.root = ref}}
                className="contextMenu"
                style= {{
                    position: 'fixed',
                    zIndex: 30000,
                }}>
              <Paper style={style}>
                <Menu desktop={true} width={200}>
                    {contextMenuItemList || null}
                </Menu>
              </Paper>
            </div>
    };
}

//action
import {unselect} from 'actions';

// redux
function mapStateToProps(state) {
    const { selectedPageId, selectedPanelId, selectedElementId, selectedComponentType, selectedComponent, pageWidth, contextMenuItemList } = state.dataReducer.present;
    return { selectedPageId, selectedPanelId, selectedElementId, selectedComponentType, selectedComponent, pageWidth, contextMenuItemList };
}

function mapDispatchToProps(dispatch) {
    return ({
        dispatch: (action) => { dispatch(action) }
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu)
