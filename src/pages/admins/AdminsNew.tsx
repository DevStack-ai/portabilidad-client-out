import React from "react";
import { Form, Formik } from "formik";
import md5 from "md5";

import { initialValues, newCompanySchema } from "./helpers/_schemas";
import Field from "../../_metronic/helpers/components/inputs/Field";
import Select from "../../_metronic/helpers/components/inputs/Select";
import { ListLoading } from "../../_metronic/helpers/components/table/components/loading/ListLoading";

import { useNavigate } from "react-router-dom";
import { checkAvailable, createuser } from "./helpers/_requests";
import { checkStrength } from "../../_metronic/helpers/components/inputs/helpers";


const NewDocumentWrappeer = () => {
  const navigate = useNavigate();
  async function onSubmit(values: any, formikHelpers: any) {
    //check email

    const query = await checkAvailable("username", {
      username: values.username.toLowerCase(),
    });
    const exist = query.data.exist;
    if (exist) {
      formikHelpers.setErrors({ username: "Este correo no esta disponible" });
      return;
    }
    const isInvalid = checkStrength(values.password) < 2
    if (isInvalid) {
      formikHelpers.setErrors({ password: "Contraseña debil, debe contener una mayuscula, minuscula y almenos un numero." });
      return;
    }
    const createValues = {
      username: values.username.toLowerCase(),
      password: md5(values.password),
      
    };
    await createuser(createValues);
    navigate("/users");
  }

  return (
    <Formik
      validationSchema={newCompanySchema}
      initialValues={initialValues}
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
                <div className="col-lg-4 fv-row mt-4">
                  <Field
                    form={formik}
                    name="username"
                    placeholder="username"
                    type="email"
                  />
                </div>


                <div className="separator my-4" />
                <div className="row mb-6 ms-0 px-0">
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Contraseña
                  </label>
                  <div className="col-lg-4 fv-row mt-4 ">
                    <Field
                      form={formik}
                      name="password"
                      placeholder="Contraseña"
                      type="password"
                    />
                  </div>
                  <label className="col-sm-12 col-lg-2 col-form-label required fw-bold fs-6 mt-4">
                    Confirmar Contraseña
                  </label>
                  <div className="col-lg-4 fv-row mt-4">
                    <Field
                      form={formik}
                      name="confirm_password"
                      placeholder="Confirmar Contraseña"
                      type="password"
                      isConfirmation
                    />
                  </div>
                </div>
              </div>

              <div className="text-right w-100 pt-lg-15 d-flex justify-content-end">
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
                  <span className="indicator-label">Agregar</span>
                  {(formik.isSubmitting) && (
                    <span className="indicator-progress">
                      Agregando...{" "}
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
export { NewDocumentWrappeer };
