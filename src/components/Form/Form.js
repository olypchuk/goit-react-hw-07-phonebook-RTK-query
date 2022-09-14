import React from "react"
import shortid from "shortid"
import { FormStyled,FormButton } from "./Form.styled"
import { PropTypes } from "prop-types"
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'
import { Notify } from "notiflix";
import { useContactsAddMutation, useGetContactsQuery} from "redux/createApi";


const schema = yup.object().shape({
  name: yup.string()
   
    .max(15)
    .required("Please enter name")
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, "Must be only letters"),

  phone: yup.string()
    .required('Please enter number')
    .min(6)
    .max(15)
    .matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, "Must be only digits")


})

export const INITIAL_STATE = {
  name: '',
  phone: ''
}

let showId = shortid.generate()  

export const FormByFormik = () => {


  const [contactsAdd]=useContactsAddMutation()
  const { data } = useGetContactsQuery()
  const handleSubmit = async(payload, { resetForm }) => {

      const findSameNumber=data?.find(contact=>contact.name.toLowerCase()===payload.name.toLowerCase())
          if (findSameNumber) {
            Notify.failure("this name already in list")
            resetForm()
            return false
    } 
      try {
      const newContact = await contactsAdd(payload)
      resetForm()
      return newContact
      } catch (error) {
      console.log('error :>> ', error);
      }

  }
  return (<Formik
    initialValues={INITIAL_STATE}
    onSubmit={handleSubmit}
    validationSchema={schema}>
    <FormStyled autoComplete="off">
         <label htmlFor="name">Name</label>
        <Field 
        id={showId}
        type="text"
        name="name"
        placeholder="enter name"
        />
      <ErrorMessage name="name"/>
     <label htmlFor="phone">Number</label> 
          <Field
        id={showId}
        type="tel"
        name="phone"
        placeholder="enter number"
        />
      <ErrorMessage name="phone"/>
        <FormButton type="submit">add contact</FormButton>
  </FormStyled>
</Formik>)


}

FormByFormik.propTypes = {
  initialValues: PropTypes.object,
  onSubmit:PropTypes.func,
  validationSchema:PropTypes.object

}
