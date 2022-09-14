
export const filterHandleChange = (arr, filter) => {
  if (!arr) return
  if(!filter)return arr
    const filteredArray = arr.filter(contact => contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
      || contact.phone.includes(filter.trim()))
  
    return filteredArray
  }
export const getContacts = ({ contacts }) => contacts.items
export const filterContacts = ({ filter }) => filter
export const sortedContactsFunction = (contacts) => {
  if (contacts) { return [...contacts].sort((a, b) => a.name.localeCompare(b.name)) }
}