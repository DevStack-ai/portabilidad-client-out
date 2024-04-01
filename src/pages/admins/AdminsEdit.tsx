import React, { useCallback, useEffect, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";

import { EditCompanySchema, initialValues } from "./helpers/_schemas";
import Field from "../../_metronic/helpers/components/inputs/Field";
import { ListLoading } from "../../_metronic/helpers/components/table/components/loading/ListLoading";

import { useNavigate, useParams } from "react-router-dom";
import { checkAvailable, getUser, updateUser } from "./helpers/_requests";
import toast from "react-hot-toast";

const EditDocumentWrappeer = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [isLoading, setIslOading] = useState(true);
  const [document, setDocument] = useState(initialValues);
  const id = params.id;

  const fetchDocument = useCallback(async () => {
    setIslOading(true);
    const query = await getUser(id);
    setDocument(query.data);
    setIslOading(false);
  }, [id]);
  useEffect(() => {
    fetchDocument();
  }, []);

  async function onSubmit(values: any, formikHelpers: any) {
    try {

      const query = await checkAvailable("username", {
        id: id,
        username: values.username.toLowerCase(),
      });
      const exist = query.data.exist;
      if (exist) {
        formikHelpers.setErrors({ username: "Este correo no esta disponible" });
        return;
      }
      const payload = {
        username: values.username,
      };
      await updateUser(id, payload);
      toast.success("Administrador editado", );
      navigate("/admins");
    } catch (err) {
      console.log(err)
    }
  }
  if (isLoading) {
    return <ListLoading />;
  }
  return (
    <Formik
      validationSchema={EditCompanySchema}
      initialValues={document}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <div className="px-10 pt-lg-10">
            <form onSubmit={formik.handleSubmit}>
              <div className="row mb-6 ms-0 px-0">
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Usuario
                </label>
                <div className="col-lg-4 fv-row mt-4 ">
                  <Field
                    form={formik}
                    name="username"
                    placeholder="Usuario"
                    type="email"
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
                    <span className="indicator-label">Editar</span> :
                    <span className="indicator-label">Editando ...</span>
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
export { EditDocumentWrappeer };
