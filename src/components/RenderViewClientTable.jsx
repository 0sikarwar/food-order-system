import { Box } from '@chakra-ui/react';
import ReactDataTable from 'data-table-reactjs';
import { useRef } from 'react';
import { snakeToCamel } from '../utils/index';
import qrCodeIcon from '../assets/images/qrCodeScan.svg';
import { useNavigate } from 'react-router-dom';

const getActions = navigate => [
  {
    key: 'viewDetails',
    handler: (index, item) => {
      console.log(index, item);
    },
    label: 'View record',
  },
  {
    key: 'viewQr',
    handler: (index, item) => {
      navigate(`/${item.id}/viewqr`);
    },
    label: (
      <img
        src={qrCodeIcon}
        alt="View table QRs"
        width="24px"
        title="View table QRs"
      />
    ),
  },
];

const filterableCol = ['name', 'mobile', 'email'];
const sortableCol = ['id'];
const getColumns = tableData => {
  return Object.keys(tableData[0]).map(key => ({
    name: snakeToCamel(key),
    selector: key,
    filterable: filterableCol.includes(key),
    sortable: sortableCol.includes(key),
  }));
};
const RenderViewClientTable = ({ tableData }) => {
  const columns = useRef(getColumns(tableData));
  const navigate = useNavigate();
  const actions = useRef(getActions(navigate));
  return (
    <Box height="85vh" marginTop="10px">
      <ReactDataTable
        title="All Clients"
        columns={columns.current}
        list={tableData}
        actions={actions.current}
        initiallyVisibleCol={[
          'id',
          'name',
          'location',
          'email',
          'reg_table_count',
          'mobile',
        ]}
        pagination
        hideOptionToSelectCol
      />
    </Box>
  );
};

export default RenderViewClientTable;
