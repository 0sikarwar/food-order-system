export const ADD_CLIENT_FIELDS = {
  name: '',
  location: '',
  email: '',
  mobile: '',
  reg_table_count: '',
  plan_expiry: '',
  plan_name: '',
  base_url_name: '',
  base_color: '',
};

export const addClientFieldsParmas = {
  name: {
    name: 'name',
    palaceholder: 'item name',
    label: 'Item name',
    validations: {
      required: 'This is required',
      minLength: { value: 4, message: 'Minimum length should be 4' },
    },
  },
  location: {
    name: 'location',
    palaceholder: 'Full Address',
    label: 'Full Address',
    validations: {
      required: 'This is required',
      minLength: { value: 10, message: 'Minimum length should be 10' },
    },
  },
  email: {
    name: 'email',
    palaceholder: 'Email Id',
    label: 'Email Id',
    validations: {
      pattern: {
        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: 'Email is not valid',
      },
    },
  },
  mobile: {
    name: 'mobile',
    palaceholder: 'Mobile number',
    label: 'Mobile Number',
    validations: {
      pattern: {
        required: 'This is required',
        value: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/,
        message: 'Mobile number is not valid',
      },
    },
  },
  reg_table_count: {
    name: 'reg_table_count',
    palaceholder: 'Table Count',
    label: 'Table Count',
    type: 'number',
  },
  plan_name: {
    name: 'plan_name',
    palaceholder: 'Plan Name',
    label: 'Plan Name',
  },
  plan_expiry: {
    name: 'plan_expiry',
    palaceholder: 'Plan Expiry',
    label: 'Plan Expiry',
    type: 'date',
  },
  base_url_name: {
    name: 'base_url_name',
    palaceholder: 'Base URL Mapped',
    label: 'Base URL Mapped',
  },
  base_color: {
    name: 'base_color',
    palaceholder: 'Base color',
    label: 'Base color',
  },
};
