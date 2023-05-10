import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useController } from 'react-hook-form';

const SearchSelect = ({ control, name, id, label, rules, ...props }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <FormControl py={2} isInvalid={!!error} id={id}>
      <FormLabel>{label}</FormLabel>

      <Select
        isMulti
        size="md"
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        {...props}
      />

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default SearchSelect;
