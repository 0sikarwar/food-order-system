import { useContext } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button, Flex, VStack } from '@chakra-ui/react';
import { RenderField } from '../components/Input';
import {
  addClientFieldsParmas,
  ADD_CLIENT_FIELDS,
} from '../utils/fields/addClientFields';
import { addClientUrl } from '../utils/apiUrl';
import { postCall } from '../utils/api';
import { ToastContext } from '../context/toastContext';
export default function RenderAddClientFields({ handleSectionChange }) {
  const { showToast } = useContext(ToastContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      enterDataFields: [{ ...ADD_CLIENT_FIELDS }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'enterDataFields',
  });

  async function onSubmit(values) {
    const res = await postCall(values.enterDataFields, addClientUrl);
    if (res.status === 'SUCCESS') {
      showToast({ msg: 'Successfully added', type: 'success' });
      handleSectionChange('');
    } else {
      showToast({ msg: 'Something went wrong', type: 'error' });
    }
  }

  return (
    <VStack w="100%" maxW="836px">
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        {fields.map((fieldObj, index) => {
          return (
            <Flex
              key={index}
              wrap="wrap"
              border="1px"
              p={2}
              borderColor="blue.100"
              borderRadius={5}
              boxShadow="sm"
              mt={2}
              pos="relative"
            >
              {Object.keys(ADD_CLIENT_FIELDS).map((keyName, idx) => {
                return (
                  <RenderField
                    fieldObj={fieldObj}
                    index={index}
                    keyName={keyName}
                    register={register}
                    errors={errors}
                    key={idx}
                    fieldsParamsObj={addClientFieldsParmas}
                  />
                );
              })}

              {fields?.length > 1 && (
                <Button
                  colorScheme="red"
                  variant="ghost"
                  alignSelf="center"
                  size="sm"
                  pos="absolute"
                  top={1}
                  right={1}
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              )}
            </Flex>
          );
        })}
        <Flex mt={4} justify={['center', 'flex-end']} w="100%" maxW="1240px">
          <Button
            mr={4}
            colorScheme="teal"
            variant="outline"
            onClick={() => append({ ...ADD_CLIENT_FIELDS })}
          >
            Add more item
          </Button>
          <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </VStack>
  );
}
