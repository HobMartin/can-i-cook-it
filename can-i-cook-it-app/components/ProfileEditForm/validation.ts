import * as Yup from "yup";

export const profileEditValidationSchema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string()
    .email("Невірний формат email")
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(6, "Пароль повинен містити не менше 6 символів")
    .required("Обов'язкове поле"),
});
