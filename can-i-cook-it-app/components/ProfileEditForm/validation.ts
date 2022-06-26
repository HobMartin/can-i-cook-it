import * as Yup from "yup";

export const profileEditValidationSchema = Yup.object().shape({
  name: Yup.string(),
  password: Yup.string().min(6, "Пароль повинен містити не менше 6 символів"),
});
