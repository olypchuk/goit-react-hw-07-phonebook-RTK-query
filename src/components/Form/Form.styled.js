import styled from "styled-components"
import {Form} from "formik"
export const FormStyled = styled(Form)`
text-align: center;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
width: 400px;
height: 100%;
background-color: rgba(221,42,123,1);
border-radius: 30px;
`
export const FormButton = styled.button`
margin: 15px;
padding: 15px;
`