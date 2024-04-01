import { FormikValues } from "formik";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { KTIcon } from "../KTIcon";
import { useField } from "formik";
import Select, { components } from "react-select";
type Props = {
  form: FormikValues;
  name: string;
  type?: string;
  placeholder?: string;
  source: string;
  options?: Array<{}>;
  optionsFilter?: Function;
  parent?: string;
  createOnScreen?: boolean;
};

export default function Field({
  form,
  name,
  placeholder = name,
  source,
  options = [],
  optionsFilter,
  createOnScreen = false,
}: Props) {
  const [_options, setOptions] = useState([...options]);
  const [isLoading, setIsLoading] = useState(!!source);
  const [field, _meta, _form] = useField({
    name,
  });

  const fetchOptions = useCallback(async () => {
    setIsLoading(true);

    const baseUrl = `${import.meta.env.VITE_API_URL}/${source}/select`;

    const query = await axios.get(baseUrl);
    const result = query.data;
    const _options = result;
    setOptions(_options);
    setIsLoading(false);
  }, [source]);

  useEffect(() => {
    if (source) {
      fetchOptions();
    }
  }, [source]);

  const MenuList = (
    props: any,
  ) => {
    return (
      <div>
        <components.MenuList {...props}>
          {props.children}
        </components.MenuList>
        {!!createOnScreen && (
          <div className="bg-white">
            <div className="text-center text-primary cursor-pointer py-3 border-top border-primary">
              <KTIcon iconName="plus" className="mt-1 " />{" "}
              <span className="fw-1">Crear {placeholder}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const getOptions = (datalist: Array<{}>) => {
    return [...datalist].filter((item: any) => {
      if (typeof optionsFilter === "function") {
        return optionsFilter(item);
      }
      return true;
    })
      .map((opt: any) => ({
        label: opt.name,
        value: opt.id,
      }));
  };
  const getValue = (value?: string) => {
    const options = getOptions(_options);
    if (options && value) {
      return options.find((option: any) => String(option.value) === String(value));
    } else if (options) {
      return options.find((option: any) => String(option.value) === String(field.value));
    } else {
      return "";
    }
  };
  return (
    <>
      <Select
        isSearchable
        isLoading={isLoading}
        value={getValue()}
        classNames={{
          control: () => clsx("form-control form-control-solid p-1"),
          container: () => "p-0 b-0",
        }}
        onChange={(opt: any) => {
          _form.setValue(opt.value);
        }}
        onBlur={() => {
          if (!field.value) {
            form.setFieldError(name, "Campo obligatorio");
          }
          form.setFieldTouched(name);
        }}
        placeholder={placeholder}
        components={{ MenuList }}
        options={getOptions(_options)}
      />

      {form.touched[name] && form.errors[name] && (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block">
            <span role="alert">{form.errors[name]}</span>
          </div>
        </div>
      )}
    </>
  );
}
