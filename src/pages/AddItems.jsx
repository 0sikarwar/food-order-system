import { useFieldArray, useForm } from 'react-hook-form';
import { Button, Flex, VStack } from '@chakra-ui/react';
import { RenderField } from '../components/Input';
import {
  enterDataFieldsParmas,
  INITIAL_FIELDS,
} from '../utils/fields/enterDataFields';
import SearchSelect from '../components/SearchSelect';
import { postCall } from '../utils/api';
import { addItemsUrl } from '../utils/apiUrl';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContext } from '../context/toastContext';
import { useContext } from 'react';
import Layout from '../components/Layout';

export default function EnterData() {
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      enterDataFields: [{ ...INITIAL_FIELDS }],
    },
  });
  const { client_id } = useParams();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'enterDataFields',
  });

  async function onSubmit(values) {
    const payload = {
      client_id,
      ...values,
    };
    const res = await postCall(payload, addItemsUrl);
    if (res.status === 'SUCCESS') {
      navigate(`/${client_id}/view-items`);
    } else {
      showToast({
        msg: res.msg,
        type: 'error',
      });
    }
  }

  return (
    <Layout>
      <VStack w="100%" maxW="836px">
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          {fields.map((fieldObj, index) => {
            return (
              <Flex
                key={fieldObj.id}
                wrap="wrap"
                border="1px"
                p={2}
                borderColor="blue.100"
                borderRadius={5}
                boxShadow="sm"
                mt={2}
                pos="relative"
              >
                <RenderField
                  fieldObj={fieldObj}
                  index={index}
                  keyName="name"
                  register={register}
                  errors={errors}
                  fieldsParamsObj={enterDataFieldsParmas}
                />
                <Flex mt={2}>
                  <RenderField
                    fieldObj={fieldObj}
                    index={index}
                    keyName="half"
                    register={register}
                    errors={errors}
                    fieldsParamsObj={enterDataFieldsParmas}
                    customStyle={{ width: '48%', maxWidth: '195px', mr: 2 }}
                  />
                  <RenderField
                    fieldObj={fieldObj}
                    index={index}
                    keyName="full"
                    register={register}
                    errors={errors}
                    fieldsParamsObj={enterDataFieldsParmas}
                    customStyle={{ width: '48%', maxWidth: '195px', mr: 2 }}
                  />
                </Flex>
                <RenderField
                  fieldObj={fieldObj}
                  index={index}
                  keyName="item_desc"
                  register={register}
                  errors={errors}
                  fieldsParamsObj={enterDataFieldsParmas}
                />
                <Flex w="100%" maxW="400px" mr={2}>
                  <SearchSelect
                    control={control}
                    name={`enterDataFields[${index}].categories`}
                    id={fieldObj.categories + index}
                    options={enterDataFieldsParmas.categories.list}
                    placeholder={enterDataFieldsParmas.categories.palaceholder}
                    label={enterDataFieldsParmas.categories.label}
                    rules={{ ...enterDataFieldsParmas.categories.validations }}
                  />
                </Flex>
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
              onClick={() => append({ ...INITIAL_FIELDS })}
            >
              Add more item
            </Button>
            <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
              Submit
            </Button>
          </Flex>
        </form>
      </VStack>
    </Layout>
  );
}
