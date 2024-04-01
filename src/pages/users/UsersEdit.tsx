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
        name: values.name,
        username: values.username,
        area: values.area,
        sgo_username: values.sgo_username,
        sgo_area: values.sgo_area,
        sgo_password: values.sgo_password,
      };
      await updateUser(id, payload);
      toast.success("Usuario editado");
      navigate("/users");
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
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  Area
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="area"
                    placeholder="Area"
                    type="text"
                  />
                </div>
                <div className="separator my-4" />

                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  SGO Usuario
                </label>
                <div className="col-lg-4 fv-row mt-4 ">
                  <Field
                    form={formik}
                    name="sgo_username"
                    placeholder="SGO Usuario"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  SGO Area
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="sgo_area"
                    placeholder="SGO Area"
                    type="text"
                  />
                </div>
                <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                  SGO Contraseña
                </label>
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="sgo_password"
                    placeholder="SGO Contraseña"
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
                  <span className="indicator-label">Editar</span>
                  {(formik.isSubmitting) && (
                    <span className="indicator-progress">
                      Editando...{" "}
                      <span className="spinner-border spinner-border-sm align-middle ms-2">
                      </span>
                    </span>
                  )}
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
