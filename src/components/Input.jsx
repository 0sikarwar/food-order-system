import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';

const Input = React.forwardRef(
  (
    { errors = {}, label, name, error, customStyle, type, list, ...rest },
    ref
  ) => {
    return (
      <FormControl isInvalid={error} {...customStyle}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        {type === 'textarea' ? (
          <Textarea name={name} ref={ref} px={2} {...rest} />
        ) : type === 'number' ? (
          <NumberInput min={0} allowMouseWheel>
            <NumberInputField name={name} ref={ref} px={2} {...rest} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        ) : (
          <ChakraInput name={name} ref={ref} px={2} type={type} {...rest} />
        )}
        <FormErrorMessage>{error && error.message}</FormErrorMessage>
      </FormControl>
    );
  }
);

export const RenderField = ({
  fieldsParamsObj,
  fieldObj,
  index,
  keyName,
  register,
  errors,
  customStyle,
}) => {
  if (!fieldsParamsObj[keyName]) return null;
  return (
    <Input
      id={fieldsParamsObj[keyName].name + index}
      placeholder={fieldsParamsObj[keyName].palaceholder}
      label={fieldsParamsObj[keyName].label}
      type={fieldsParamsObj[keyName].type}
      {...register(`enterDataFields[${index}].${keyName}`, {
        ...(fieldsParamsObj[keyName].validations || {}),
      })}
      error={errors.enterDataFields?.[index]?.[keyName]}
      customStyle={
        customStyle || { width: '100%', maxWidth: '400px', mr: 2, mt: 2 }
      }
    />
  );
};

export default Input;
