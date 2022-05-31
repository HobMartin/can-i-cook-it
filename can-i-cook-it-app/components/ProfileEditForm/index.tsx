import { View, Text, TextInput, Button } from "../Themed";
import React from "react";
import { Formik } from "formik";
import { profileEditFormStyles } from "./styles";
import { profileEditValidationSchema } from "./validation";

export const ProfileEditForm = ({ onSubmit, submitText }: any) => {
  return (
    <View>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          onSubmit(values);
          resetForm();
          setSubmitting(false);
        }}
        validationSchema={profileEditValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          values,
        }) => (
          <View style={profileEditFormStyles.container}>
            <TextInput
              style={profileEditFormStyles.input}
              placeholder="Ваше ім'я"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text
                style={profileEditFormStyles.inputErrorText}
                lightColor="red"
                darkColor="red"
              >
                {errors.email}
              </Text>
            )}
            <TextInput
              style={profileEditFormStyles.input}
              placeholder="Пароль"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors.password && touched.password && (
              <Text
                style={profileEditFormStyles.inputErrorText}
                lightColor="red"
                darkColor="red"
              >
                {errors.password}
              </Text>
            )}
            <Button
              style={profileEditFormStyles.submit}
              onPress={handleSubmit as any}
              text={submitText}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
