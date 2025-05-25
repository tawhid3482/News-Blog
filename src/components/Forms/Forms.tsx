/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ReactNode } from "react";

type TFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type TFormProps = {
  children: ReactNode;
  onSubmit: (data: FieldValues, reset: () => void) => void;
} & TFormConfig;

const Forms = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (resolver) formConfig["resolver"] = resolver;
  if (defaultValues) formConfig["defaultValues"] = defaultValues;

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data, () => reset());
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default Forms;
