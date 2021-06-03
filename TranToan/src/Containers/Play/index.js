import React from 'react';
import {Text, View, TextInput, Button, Alert, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {MetricsSizes} from '../../Themes';

export default function App() {
  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First name</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="firstName"
        rules={{required: true}}
      />
      <Text style={styles.label}>Last name</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="lastName"
        rules={{required: true}}
      />

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Reset"
          onPress={() => {
            reset({
              firstName: 'Trần Văn',
              lastName: 'Toàn',
            });
          }}
        />
      </View>

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Button"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 15,
    padding: 8,
    backgroundColor: '#f61f',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
