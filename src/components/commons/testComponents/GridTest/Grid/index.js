import contain from './Container';
import {
  EditingState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';

// SUBCOMPONENTS

var Present = ({ props, state, style, functions }) => {
  let { values, customValue } = props;
  let { url } = state;
  let { undo, redo, click, handleChange } = functions;
  return (
    <div id='template' style={style.mainStyle}>
    <Grid
    rows={[
      { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
      { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
    ]}
    columns={[
      { name: 'id', title: 'ID' },
      { name: 'product', title: 'Product' },
      { name: 'owner', title: 'Owner' },
    ]}>
    <TableView />
    <TableHeaderRow />
    </Grid>
    </div>
  )
}

export default contain(Present)
