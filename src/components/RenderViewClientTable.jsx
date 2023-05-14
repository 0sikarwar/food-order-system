import { Box } from '@chakra-ui/react';
import ReactDataTable from 'data-table-reactjs';
import { useContext, useEffect, useRef, useState } from 'react';
import { snakeToCamel } from '../utils/index';
import qrCodeIcon from '../assets/images/qrCodeScan.svg';
import lightBin from '../assets/images/lightBin.svg';
import darkBin from '../assets/images/darkBin.svg';
import { useNavigate } from 'react-router-dom';
import { deleteCall } from '../utils/api';
import Loader from './Loader';
import { deleteClientUrl } from '../utils/apiUrl';
import { ToastContext } from '../context/toastContext';

const getActions = (navigate, setDeleteRes) => [
  {
    key: 'viewQr',
    handler: (_, item) => {
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
  {
    key: 'deleteItem',
    handler: async (index, item) => {
      const confirm = window.confirm(
        `Are you sure you want to delete ${item.name}`
      );
      if (confirm) {
        setDeleteRes('loading');
        const res = await deleteCall({ id: item.id }, deleteClientUrl);
        setDeleteRes({ ...res, clinetName: item.name, id: item.id });
      }
    },
    label: (
      <img
        src={lightBin}
        onMouseOver={e => (e.currentTarget.src = `${darkBin}`)}
        onMouseOut={e => (e.currentTarget.src = `${lightBin}`)}
        border="0"
        alt="Delete"
        title="Delete"
      />
    ),
  },
];

const filterableCol = ['name', 'mobile', 'email'];
const sortableCol = ['reg_table_count'];
const getColumns = tableData => {
  return Object.keys(tableData[0]).map(key => ({
    name: snakeToCamel(key),
    selector: key,
    filterable: filterableCol.includes(key),
    sortable: sortableCol.includes(key),
  }));
};
const RenderViewClientTable = ({ tableData, setTableData }) => {
  const { showToast } = useContext(ToastContext);
  const columns = useRef(getColumns(tableData));
  const navigate = useNavigate();
  const [deleteResp, setDeleteRes] = useState(null);
  const actions = useRef(getActions(navigate, setDeleteRes));
  useEffect(() => {
    if (deleteResp && deleteResp !== 'loading') {
      if (deleteResp.status === 'SUCCESS') {
        showToast({
          msg: `Successfully deleted ${deleteResp.clinetName}`,
          type: 'success',
        });
        setTableData(tableData.filter(obj => obj.id !== deleteResp.id));
      } else {
        showToast({
          msg: 'Something went wrong please try again later',
          type: 'error',
        });
      }
    }
  }, [deleteResp]);
  return (
    <Box height="85vh" marginTop="10px">
      {deleteResp === 'loading' && <Loader />}
      <ReactDataTable
        title="All Clients"
        columns={columns.current}
        list={tableData}
        actions={actions.current}
        initiallyVisibleCol={[
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
