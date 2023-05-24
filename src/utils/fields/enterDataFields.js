export const categoryList = [
  { value: 'vanilla', label: 'Vanilla', rating: 'safe' },
  { value: 'chocolate', label: 'Chocolate', rating: 'good' },
  { value: 'strawberry', label: 'Strawberry', rating: 'wild' },
  { value: 'salted-caramel', label: 'Salted Caramel', rating: 'crazy' },
];

export const INITIAL_FIELDS = {
  name: '',
  half: '',
  full: '',
  item_desc: '',
  categories: '',
};

export const enterDataFieldsParmas = {
  name: {
    name: 'name',
    palaceholder: 'item name',
    label: 'Item name',
    validations: {
      required: 'This is required',
      minLength: { value: 4, message: 'Minimum length should be 4' },
    },
  },
  half: {
    name: 'half',
    palaceholder: 'half price',
    label: 'Half price',
    type: 'number',
  },
  full: {
    name: 'full',
    palaceholder: 'full price',
    label: 'Full price',
    type: 'number',
    validations: {
      required: 'This is required',
      pattern: {
        value: /^([1-9]\d*)(\.\d+)?$/,
        message: 'Value must be greater than 0',
      },
    },
  },
  item_desc: {
    name: 'item_desc',
    palaceholder: 'description of the item',
    label: 'Description',
    type: 'textarea',
  },
  categories: {
    name: 'categories',
    palaceholder: 'Categories',
    label: 'Select categories of item',
    type: 'select',
    list: categoryList,
    validations: {
      required: 'This is required',
    },
  },
};
