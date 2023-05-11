import ReactDataTable from 'data-table-reactjs';
import { useRef } from 'react';
import { snakeToCamel } from '../utils/index';
const actions = [
  {
    key: 'viewDetails',
    handler: (index, item) => {
      console.log(index, item);
    },
    label: 'View record',
  },
];

const filterableCol = [];
const sortableCol = [];
const getColumns = tableData => {
  return Object.keys(tableData[0]).map(key => ({
    name: snakeToCamel(key),
    selector: key,
    filterable: filterableCol.includes(key),
    sortable: sortableCol.includes(key),
  }));
};
console.log(snakeToCamel('test_frdt_zrd'));
const RenderViewClientTable = ({ tableData }) => {
  const columns = useRef(getColumns(tableData));
  return (
    <ReactDataTable
      title="Title of the table"
      columns={columns.current}
      list={tableData}
      actions={actions}
      // showSerialNumber
      pagination
    />
  );
};

export default RenderViewClientTable;
