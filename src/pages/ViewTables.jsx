import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { getCall } from '../utils/api';
import { viewTableUrl } from '../utils/apiUrl';

const ViewTables = () => {
  const { client_id } = useParams();
  const [loading, setLoading] = useState(true);
  const [cleintData, setClientData] = useState(null);
  const [tableStatusList, setTableStatusList] = useState(null);
  const navigate = useNavigate();
  async function getTablesList() {
    const res = await getCall(viewTableUrl + client_id);
    if (res.status === 'SUCCESS') {
      setClientData(res.clientData);
      setTableStatusList(res.tableStatus);
      setLoading(false);
    }
  }
  useEffect(() => {
    getTablesList();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <Box>
      <Heading> All tables</Heading>
      <Flex width="100%" justifyContent="space-around" wrap="wrap">
        {new Array(cleintData.reg_table_count).fill(0).map((_, index) => {
          const statusObj = tableStatusList.find(obj => obj.table_id === index);
          return (
            <Badge
              key={index}
              w="160px"
              h="70px"
              colorScheme={statusObj?.status === 'busy' ? 'red' : 'green'}
              borderRadius="10px"
              cursor="pointer"
              onClick={() => {
                statusObj?.status === 'busy' &&
                  navigate(`/${client_id}/view-table-cart/${index}`);
              }}
              mt="30px"
            >
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Heading size="md">Table No. {index + 1}</Heading>
                {statusObj?.status === 'busy' && (
                  <Text fontSize="10px">
                    Busy since:
                    <br />
                    {new Date(statusObj.update_date).toLocaleString('en-IN', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </Text>
                )}
              </Flex>
            </Badge>
          );
        })}
      </Flex>
    </Box>
  );
};

export default ViewTables;
