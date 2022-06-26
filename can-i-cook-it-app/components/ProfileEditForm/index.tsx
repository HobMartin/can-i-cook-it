import { View, Text, TextInput, Button, useThemeColor } from "../Themed";
import React from "react";
import { Formik, useFormikContext } from "formik";
import { profileEditFormStyles } from "./styles";
import { profileEditValidationSchema } from "./validation";

export const ProfileEditForm = ({ onSubmit, submitText, onCancel }: any) => {
  const borderColor = useThemeColor({}, "buttonBackground");

  return (
    <View>
      <Formik
        initialValues={{ displayName: "", password: "" }}
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
          resetForm,
          errors,
          touched,
          values,
        }) => (
          <View style={profileEditFormStyles.container}>
            <TextInput
              style={[profileEditFormStyles.input, { borderColor }]}
              placeholder="Ваше ім'я"
              onChangeText={handleChange("displayName")}
              onBlur={handleBlur("displayName")}
              value={values.displayName}
            />
            {errors.displayName && touched.displayName && (
              <Text
                style={profileEditFormStyles.inputErrorText}
                lightColor="red"
                darkColor="red"
              >
                {errors.displayName}
              </Text>
            )}
            <TextInput
              style={[profileEditFormStyles.input, { borderColor }]}
              placeholder="Новий пароль"
              textContentType="newPassword"
              secureTextEntry={true}
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
              style={profileEditFormStyles.button}
              onPress={handleSubmit as any}
              text="Підтвердити"
            />
            <Button
              style={profileEditFormStyles.button}
              onPress={() => {
                onCancel && onCancel();
                resetForm();
              }}
              text="Скасувати"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
