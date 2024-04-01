
import * as yup from "yup";


export const newCompanySchema = yup.object().shape({
    username:  yup.string().email("Formato invalido").min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
    password: yup.string().required("Campo obligatorio"),
    confirm_password: yup.string()
    .required("Campo obligatorio")
    .oneOf([yup.ref('password'), ""], 'Las contraseñas no coinciden')
})
export const EditCompanySchema = yup.object().shape({
    username:  yup.string().email("Formato invalido").min(3, "Longitud minima 3 digitos").required("Campo obligatorio"),
})
export const initialValues = {
    username: "",
    password: "",
    confirm_password: "",

}