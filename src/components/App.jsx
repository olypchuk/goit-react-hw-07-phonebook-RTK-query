import React from "react";
import { StyledApp } from "./Container/Container.styled";
import { ContactsList } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
import { FormByFormik } from "./Form/Form";
import { useDispatch ,useSelector} from "react-redux";
import { setFilter } from "redux/filterSlice";
import { filterHandleChange, filterContacts, sortedContactsFunction } from "redux/selectors";

import { useGetContactsQuery } from "redux/createApi";

export function App() {

  const filter  = useSelector(filterContacts)
  const dispatch = useDispatch()
  const { data } = useGetContactsQuery()


  const sortedContacts = sortedContactsFunction(data)
  const filteredArray = filterHandleChange(sortedContacts, filter)
  const setFilterContacts = (e) => dispatch(setFilter(e.target.value))


  
     return (
      <StyledApp>
        <h1>Phonebook</h1>
               <FormByFormik/>
         <h2>Contacts</h2>
         <Filter onChange={setFilterContacts} value={filter} />
         {data?.length > 0 && <ContactsList data={filteredArray}   />}
       
       
     
     </StyledApp>
    )
}



