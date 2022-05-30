import React from "react";
import { Formik } from "formik";
import { Text, View, TextInput, Button } from "../Themed";
import { authValidationSchema } from "./validation";
import { authFormStyles } from "./styles";

interface AuthFormProps {
  onSubmit: (values: any) => void;
  submitText: string;
}

export const AuthForm = (props: AuthFormProps) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { resetForm, setSubmitting }) => {
      props.onSubmit(values);
      resetForm();
      setSubmitting(false);
    }}
    validationSchema={authValidationSchema}
  >
    {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
      <View style={authFormStyles.container}>
        <TextInput
          style={authFormStyles.input}
          textContentType="emailAddress"
          placeholder="Email"
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          value={values.email}
        />
        {errors.email && touched.email && (
          <Text
            style={authFormStyles.inputErrorText}
            lightColor="red"
            darkColor="red"
          >
            {errors.email}
          </Text>
        )}
        <TextInput
          style={authFormStyles.input}
          textContentType="password"
          secureTextEntry={true}
          placeholder="Пароль"
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          value={values.password}
        />
        {errors.password && touched.password && (
          <Text
            style={authFormStyles.inputErrorText}
            lightColor="red"
            darkColor="red"
          >
            {errors.password}
          </Text>
        )}
        <Button
          style={authFormStyles.submit}
          onPress={handleSubmit as any}
          text={props.submitText}
        />
      </View>
    )}
  </Formik>
);
