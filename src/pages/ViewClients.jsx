import { Box } from '@chakra-ui/react';
import ReactDataTable from 'data-table-reactjs';
import { useContext, useEffect, useRef, useState } from 'react';
import { getColumns } from '../utils/index';
import qrCodeIcon from '../assets/images/qrCodeScan.svg';
import lightBin from '../assets/images/lightBin.svg';
import darkBin from '../assets/images/darkBin.svg';
import editInventoryDark from '../assets/images/editInventoryDark.svg';
import editInventoryLight from '../assets/images/editInventoryLight.svg';
import viewInventoryDark from '../assets/images/viewInventoryDark.svg';
import viewInventoryLight from '../assets/images/viewInventoryLight.svg';
import { useNavigate } from 'react-router-dom';
import { deleteCall, getCall } from '../utils/api';
import Loader from '../components/Loader';
import { deleteClientUrl, getAllClientUrl } from '../utils/apiUrl';
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
  {
    key: 'editInventory',
    handler: (_, item) => {
      navigate(`/${item.id}/add-items`);
    },
    label: (
      <img
        src={editInventoryLight}
        onMouseOver={e => (e.currentTarget.src = `${editInventoryDark}`)}
        onMouseOut={e => (e.currentTarget.src = `${editInventoryLight}`)}
        border="0"
        alt="Add items"
        title="Add items"
      />
    ),
  },
  {
    key: 'viewInventory',
    handler: (_, item) => {
      navigate(`/${item.id}/view-items`);
    },
    label: (
      <img
        src={viewInventoryLight}
        onMouseOver={e => (e.currentTarget.src = `${viewInventoryDark}`)}
        onMouseOut={e => (e.currentTarget.src = `${viewInventoryLight}`)}
        border="0"
        alt="View items"
        title="View items"
      />
    ),
  },
];

const filterableCol = ['name', 'mobile', 'email'];
const sortableCol = ['reg_table_count'];
const ViewClients = () => {
  const { showToast } = useContext(ToastContext);
  const [tableData, setTableData] = useState();
  const columns = useRef();
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

  async function getClients() {
    const res = await getCall(getAllClientUrl);
    if (res.status === 'SUCCESS') {
      setTableData(res.list);
      columns.current = getColumns(res.list, filterableCol, sortableCol);
    } else {
      showToast({
        msg: 'Something went wrong please try again',
        type: 'error',
      });
    }
  }

  useEffect(() => {
    getClients();
  }, []);
  return (
    <Box height="85vh" marginTop="10px">
      {tableData ? (
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
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default ViewClients;
