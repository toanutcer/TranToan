import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Controller} from 'react-hook-form';

const ComponentInput = observer(
  ({control = {}, name = '', errors = '', placeholder = '', isShow = ''}) => {
    return (
      <View style={styles.main}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder={placeholder}
              style={{
                backgroundColor: 'white',
                height: 40,
                padding: 10,
                borderRadius: 40,
                borderWidth: 1,
                borderColor: '#2F80ED',
              }}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              secureTextEntry={isShow}
            />
          )}
          name={name}
        />
        {errors[name] && (
          <Text style={{color: 'red'}}>{errors[name]?.message}</Text>
        )}
      </View>
    );
  },
);
const styles = StyleSheet.create({});
export default ComponentInput;
