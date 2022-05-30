import * as Yup from "yup";

export const authValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Невірний формат email")
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(6, "Пароль повинен містити не менше 6 символів")
    .required("Обов'язкове поле"),
});
