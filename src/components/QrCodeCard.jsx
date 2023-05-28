import { Box, useColorModeValue, Text, Stack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { QRCode } from '../utils/qrCodeGanerator';

export default function QrCodeCard({ table, clientId }) {
  const path = `/${clientId}/orderitem/${table}`;
  const getImageSource = () => {
    const u = `${window.location.origin}${path}`;
    const s = QRCode.generatePNG(u, {
      ecclevel: 'M',
      format: 'html',
      fillcolor: '#fff',
      textcolor: '#000',
      margin: 4,
      modulesize: 8,
    });
    return s;
  };

  return (
    <Box
      role={'group'}
      p={6}
      maxW={'330px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'xl'}
      rounded={'lg'}
      pos={'relative'}
      border={'0.5px solid #e6e6e6'}
      m={5}
    >
      <Box rounded={'lg'} pos={'relative'} height={'230px'}>
        <Image
          rounded={'lg'}
          height={230}
          width={282}
          objectFit={'cover'}
          src={getImageSource()}
        />
      </Box>
      <Stack pt={5} align={'center'}>
        <Text
          color={'blue.500'}
          textDecoration={'underline'}
          fontSize={'sm'}
          textTransform={'uppercase'}
          as={Link}
          to={path}
        >
          Table <strong>{table + 1}</strong> QR CODE
        </Text>
      </Stack>
      <Stack direction={'column'} align={'center'}>
        <Text fontWeight={800} fontSize={'xl'} cursor={'pointer'}>
          Download Code
        </Text>
      </Stack>
    </Box>
  );
}
