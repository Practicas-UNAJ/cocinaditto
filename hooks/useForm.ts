import { ApolloError } from "@apollo/client";
import { useState } from "react";
import CocinadittoError from "../interfaces/CocinadittoError";
import { formatError } from "../utils/formatError";
import { z } from "zod";

const useForm = <T>({
  initialValue,
  schema,
}: {
  initialValue?: Partial<T>;
  schema?: z.AnyZodObject | z.ZodEffects<any, any, any>;
}) => {
  const [form, setForm] = useState<T>((initialValue ?? {}) as T);
  const [errors, setErrors] = useState<T>();

  const onError = (error: ApolloError) => {
    setErrors({
      ...errors,
      ...formatError(error),
    } as unknown as T);
  };

  const onChange = (ev: any) => {
    if (ev.target.type === "number" && !/^-?\d+$/.test(ev.target.value)) return;

    setForm({
      ...form,
      [ev.target.name]: ev.target.value,
    } as T);

    return;
  };

  const resetErrors = () => {
    setErrors(undefined);
  };

  const updateForm = (newForm: Partial<T>) =>
    setForm((state) => {
      return { ...state, ...newForm };
    });

  const resetForm = () => setForm(initialValue as T);

  const submit = async ({
    ev,
    func,
  }: {
    ev?: any;
    func: (...args: any) => any;
  }) => {
    try {
      if (ev) ev.preventDefault();

      if (schema) {
        const result = schema.safeParse({
          ...form,
        });

        resetErrors();
        if (!result.success) throw formatError(result.error);
      }

      func();
    } catch (err) {
      if (err instanceof Array<CocinadittoError>) {
        err.forEach((error) => {
          if (error.field.includes("+")) {
            const [field, sibling] = error.field.split("+");

            setErrors(
              (state) =>
                ({
                  ...state,
                  [field]: error.message,
                  [sibling]: error.message,
                } as unknown as T)
            );

            return;
          }

          setErrors((state) => {
            return { ...state, [error.field]: error.message } as T;
          });
        });
      }
    }
  };

  return {
    form,
    resetForm,
    updateForm,
    onChange,
    errors,
    resetErrors,
    onError,
    submit,
  };
};

export default useForm;
