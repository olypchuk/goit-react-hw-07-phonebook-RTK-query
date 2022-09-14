import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6317c838ece2736550bae229.mockapi.io/api/'
  }),
  tagTypes: ['contacts'],

  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/contacts`,
      providesTags:['contacts']
    }),

    contactsAdd: builder.mutation({
      
      query: initialContact => ({
        url: '/contacts',
        method: 'POST',
        body: {
          name: initialContact.name,
          phone:initialContact.phone,
        }
      }),
      invalidatesTags:['contacts']

    }),
    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `/contacts/${contactId}`,
        method:'DELETE',
      }),
      invalidatesTags: ['contacts']
    }),
     

  }),
})
export const { useGetContactsQuery, useContactsAddMutation,useDeleteContactMutation } = contactsApi

