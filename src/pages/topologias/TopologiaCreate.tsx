import React, { useCallback, useEffect, useState } from "react";
import { Form, Formik } from "formik";

import { ListLoading } from "../../_metronic/helpers/components/table/components/loading/ListLoading";

import { useNavigate, useParams } from "react-router-dom";
import { createUser } from "./helpers/_requests";

import Field from "../../_metronic/helpers/components/inputs/Field";
import toast from "react-hot-toast";
import { DocumentSchemaCreate } from "./helpers/_schemas";

const CreateDocumentWrapper = () => {
    const navigate = useNavigate();
    const [isLoading, setIslOading] = useState(false);

    async function onSubmit(values: any) {
        try {


            setIslOading(true)
            const payload = {
                description: values.description,
            };
            await createUser(payload);
            toast.success("Tipologia Creada",);
            navigate("/topologias");
            setIslOading(false)

        } catch (err) {
            console.log(err)
        }
    }
    if (isLoading) {
        return <ListLoading />;
    }
    return (
        <Formik
            validationSchema={DocumentSchemaCreate}
            initialValues={{ description: "" }}
            onSubmit={onSubmit}
        >
            {(formik) => (
                <Form>
                    <div className="px-10 pt-lg-10">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row mb-6 ms-0 px-0">
                                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                                    Descripcion
                                </label>
                                <div className="col-lg-4 fv-row mt-4 ">
                                    <Field
                                        form={formik}
                                        name="description"
                                        placeholder="Descripcion"
                                        type="text"
                                    />
                                </div>



                            </div>

                            <div className="text-right w-100 pt-15 d-flex justify-content-end">
                                <button
                                    type="reset"
                                    onClick={() => navigate("..")}
                                    className="btn btn-light me-3"
                                    data-kt-users-modal-action="cancel"
                                    disabled={formik.isSubmitting}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        formik.handleSubmit();
                                    }}
                                    disabled={formik.isSubmitting || !formik.isValid ||
                                        !formik.touched}
                                >
                                    {(!formik.isSubmitting) ?
                                        <span className="indicator-label">Crear</span> :
                                        <span className="indicator-label">Creando ...</span>
                                    }
                                </button>
                            </div>
                        </form>
                        {(formik.isSubmitting) && <ListLoading />}
                    </div>
                </Form>
            )}
        </Formik>
    );
};
export { CreateDocumentWrapper };
