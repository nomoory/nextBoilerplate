import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState, EditingState, PagingState,
  LocalPaging, LocalSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropContext, TableColumnReordering,
  VirtualTableView,
} from '@devexpress/dx-react-grid-material-ui';

import {
  TableCell,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
} from 'material-ui';

import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';
import CancelIcon from 'material-ui-icons/Cancel';
import { withStyles } from 'material-ui/styles';

import { ProgressBarCell } from './templates/progress-bar-cell';
import { HighlightedCell } from './templates/highlighted-cell';
import {
  generateRows,
  globalSalesValues,
  defaultColumnValues,
} from './demo-data/generator';

const styles = theme => ({
  commandButton: {
    minWidth: '40px',
  },
  lookupEditCell: {
    verticalAlign: 'top',
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 1.25,
    '& ~ $lookupEditCell': {
      paddingLeft: theme.spacing.unit,
    },
  },
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
});

const commandTemplates = {
  add: (onClick, allowAdding) => (
    <div style={{ textAlign: 'center' }}>
      <Button
        color="primary"
        onClick={onClick}
        title="Create new row"
        disabled={!allowAdding}
      >
        New
      </Button>
    </div>
  ),
  edit: onClick => (
    <IconButton onClick={onClick} title="Edit row">
      <EditIcon />
    </IconButton>
  ),
  delete: onClick => (
    <IconButton onClick={onClick} title="Delete row">
      <DeleteIcon />
    </IconButton>
  ),
  commit: onClick => (
    <IconButton onClick={onClick} title="Save changes">
      <SaveIcon />
    </IconButton>
  ),
  cancel: onClick => (
    <IconButton color="accent" onClick={onClick} title="Cancel changes">
      <CancelIcon />
    </IconButton>
  ),
};

const LookupEditCellBase = (({
  value, onValueChange, availableValues, classes,
}) => (
  <TableCell
    className={classes.lookupEditCell}
  >
    <Select
      value={value}
      onChange={event => onValueChange(event.target.value)}
      InputClasses={{ root: classes.inputRoot }}
    >
      {availableValues.map(item => (
        <MenuItem key={item} value={item}>{item}</MenuItem>
      ))}
    </Select>
  </TableCell>
));
LookupEditCellBase.propTypes = {
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  availableValues: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};
LookupEditCellBase.defaultProps = {
  value: undefined,
};

export const LookupEditCell = withStyles(styles, { name: 'ControlledModeDemo' })(LookupEditCellBase);

const availableValues = {
  product: globalSalesValues.product,
  region: globalSalesValues.region,
  customer: globalSalesValues.customer,
};

const getRowId = row => row.id;

class PatternGridBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region', width: 110 },
        {
          name: 'amount', title: 'Amount', align: 'right', width: 90,
        },
        { name: 'discount', title: 'Discount', width: 110 },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'customer', title: 'Customer' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...globalSalesValues },
        length: 12,
      }),
      sorting: [],
      editingRows: [],
      addedRows: [],
      changedRows: {},
      currentPage: 0,
      deletingRows: [],
      pageSize: 0,
      allowedPageSizes: [5, 10, 0],
      columnOrder: ['product', 'region', 'amount', 'discount', 'saleDate', 'customer'],
    };

    this.changeSorting = sorting => this.setState({ sorting });
    this.changeEditingRows = editingRows => this.setState({ editingRows });
    this.changeAddedRows = addedRows => this.setState({
      addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
        amount: 0,
        discount: 0,
        saleDate: new Date().toISOString().split('T')[0],
        product: availableValues.product[0],
        region: availableValues.region[0],
        customer: availableValues.customer[0],
      })),
    });
    this.changeChangedRows = changedRows => this.setState({ changedRows });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
    this.commitChanges = ({ added, changed, deleted }) => {
      let { rows } = this.state;
      if (added) {
        const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];
      }
      if (changed) {
        rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      }
      this.setState({ rows, deletingRows: deleted || this.state.deletingRows });
    };
    this.cancelDelete = () => this.setState({ deletingRows: [] });
    this.deleteRows = () => {
      const rows = this.state.rows.slice();
      this.state.deletingRows.forEach((rowId) => {
        const index = rows.findIndex(row => row.id === rowId);
        if (index > -1) {
          rows.splice(index, 1);
        }
      });
      this.setState({ rows, deletingRows: [] });
    };
    this.changeColumnOrder = (order) => {
      this.setState({ columnOrder: order });
    };

    this.tableCellTemplate = ({ row, column, style }) => {
      if (column.name === 'discount') {
        return (
          <ProgressBarCell value={row.discount * 100} style={style} />
        );
      } else if (column.name === 'amount') {
        return (
          <HighlightedCell align={column.align} value={row.amount} style={style} />
        );
      }
      return undefined;
    };
    this.editCellTemplate = ({ column, value, onValueChange }) => {
      const columnValues = availableValues[column.name];
      if (columnValues) {
        return (
          <LookupEditCell
            column={column}
            value={value}
            onValueChange={onValueChange}
            availableValues={columnValues}
          />
        );
      }
      return undefined;
    };
    this.commandTemplate = ({ executeCommand, id }) => {
      const template = commandTemplates[id];
      if (template) {
        const allowAdding = !this.state.addedRows.length;
        const onClick = (e) => {
          executeCommand();
          e.stopPropagation();
        };
        return template(
          onClick,
          allowAdding,
        );
      }
      return undefined;
    };
  }
  render() {
    const {
      classes,
    } = this.props;
    const {
      rows,
      columns,
      sorting, // array로 columnName과 direction의 dictionary가 저장됨 (지금은 기준 하나만 가능)
      editingRows, // array로 변경 상태 On 시 id가 push됨 : [id,id,id]
      addedRows, // array로 new를 누르면 새로운 row가 임시로 이곳에 저장, 값 변경도 이곳에 저장, 최종 저장을 해야함
      changedRows, // 변경 중, 변경 상태 저장 [id]: {key: changedValue}
      currentPage, // entities no / page size 중 현재 페이지 위치
      deletingRows, // array로 제거 버튼을 누르면 팝업이 뜨며 id가 이곳에 추가됨 (지워지기전 Temp)
      pageSize, // pagenation에서 선택한 page size
      allowedPageSizes, // 선택 가능한 page size로 0이면 All
      columnOrder, // array 안에 key String들, Drag drop으로 변경 가능한 page의 순서
    } = this.state;

    return (
      <div >
        <Grid
          rows={rows}
          columns={columns}
          getRowId={getRowId}
        >
          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={this.changePageSize}
          />

          <LocalSorting />
          <LocalPaging />

          <EditingState
            editingRows={editingRows}
            onEditingRowsChange={this.changeEditingRows}
            changedRows={changedRows}
            onChangedRowsChange={this.changeChangedRows}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
          />

          <DragDropContext />

          <VirtualTableView
            tableCellTemplate={this.tableCellTemplate}
          />

          <TableColumnReordering
            order={columnOrder}
            onOrderChange={this.changeColumnOrder}
          />

          <TableHeaderRow allowSorting allowDragging />
          <TableEditRow
            editCellTemplate={this.editCellTemplate}
          />
          <TableEditColumn
            width={120}
            allowAdding
            allowEditing
            allowDeleting
            commandTemplate={this.commandTemplate}
          />
          <PagingPanel
            allowedPageSizes={allowedPageSizes}
          />
        </Grid>

        <Dialog
          open={!!deletingRows.length}
          onRequestClose={this.cancelDelete}
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle>Delete Row</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to delete the following row?
            </DialogContentText>
            <Grid
              rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
              columns={columns}
            >
              <VirtualTableView
                tableCellTemplate={this.tableCellTemplate}
              />
              <TableHeaderRow />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelDelete} color="primary">Cancel</Button>
            <Button onClick={this.deleteRows} color="accent">Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

PatternGridBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { name: 'ControlledModeDemo' })(PatternGridBase);
