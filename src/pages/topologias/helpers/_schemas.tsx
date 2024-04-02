
import * as yup from "yup";


export const DocumentSchemaCreate = yup.object().shape({
    description: yup.string().min(3, "Longitud minima 3 letras").required("Campo obligatorio"),

})

export const initialValues = {
    description: ""
}