import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactDataTable from 'data-table-reactjs';
import { Box } from '@chakra-ui/react';
import Loader from '../components/Loader';
import { ToastContext } from '../context/toastContext';
import { getCall } from '../utils/api';
import { viewItemsUrl } from '../utils/apiUrl';
import { getColumns } from '../utils';
import { ItemsContext } from '../context/itemsContext';

const filterableCol = ['name', 'categories'];
const sortableCol = ['half', 'full'];

const ViewItems = () => {
  const { showToast } = useContext(ToastContext);
  const { setItemList, itemList } = useContext(ItemsContext);
  const { client_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState(null);
  const columns = useRef();

  async function getItems() {
    const res = itemList || (await getCall(viewItemsUrl + client_id));
    if (!itemList) setItemList(res);
    if (res.status === 'SUCCESS') {
      setTableData(res.list);
      if (res.list.length) {
        columns.current = getColumns(res.list, filterableCol, sortableCol);
        setIsLoading(false);
      } else {
        showToast({
          msg: 'No item found',
          type: 'warning',
        });
      }
    } else {
      showToast({
        msg: 'Something went wrong please try again',
        type: 'error',
      });
    }
  }
  useEffect(() => {
    getItems();
  }, []);
  return (
    <Box height="85vh" marginTop="10px">
      {isLoading || !tableData.length ? (
        <Loader />
      ) : (
        <ReactDataTable
          title="All Items"
          columns={columns.current}
          list={tableData}
          // actions={actions.current}
          initiallyVisibleCol={[
            'name',
            'categories',
            'full',
            'half',
            'item_desc',
            'order_count',
          ]}
          pagination
          hideOptionToSelectCol
          showSerialNumber
        />
      )}
    </Box>
  );
};

export default ViewItems;
