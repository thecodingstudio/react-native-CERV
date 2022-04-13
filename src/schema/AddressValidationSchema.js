import * as yup from 'yup';

const AddressValidationSchema = yup.object().shape({
    tag: yup.string().required('Address Tag is required.').max(15,'Tag cannot be more than 15 characters long.'),
    address: yup.string().required('Address is required.'),
    icon: yup.string().required('Icon is required.'),
})

export default AddressValidationSchema;