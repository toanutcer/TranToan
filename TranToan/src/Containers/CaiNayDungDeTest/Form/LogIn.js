import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import * as yup from 'yup';
import ComponentInput from '../../../Components/ComponentInput';
import {Color, fontFamily, FontSize, ICONS, IMAGES} from '../../../Themes';
import perfectSize from '../../../Themes/Screen';
//Fb login

import {LoginManager, AccessToken} from 'react-native-fbsdk';
const schema = yup.object().shape({
  user: yup
    .string()
    .email('Không phải địa chỉ email')
    .required('Vui lòng nhập email'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});
export default function App(props) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(schema)});
  const onSubmit = data => console.log(data);
  //Function facebook Auth
  //TODO: Facebook Login
  //FIXME: cần sửa lại hask key, lỗi đâu không biết
  function _fbAuth() {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  }
  return (
    <ImageBackground source={IMAGES.bgLogin} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Login</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.mainInput}>
          <View>
            <Text style={styles.textInput}>Email </Text>
            <View style={styles.input}>
              <ComponentInput
                control={control}
                name="user"
                errors={errors}
                isShow={false}
              />
            </View>
          </View>
          <View>
            <Text style={styles.textInput}>Password</Text>
            <View style={styles.input}>
              <ComponentInput
                control={control}
                name="password"
                errors={errors}
                isShow={true}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
              }}>
              <Text
                style={[
                  styles.textInput,
                  {
                    fontWeight: 'bold',
                  },
                ]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnConfirm}>
          <Button
            buttonStyle={{
              borderRadius: perfectSize(15),
              width: perfectSize(150),
              height: perfectSize(60),
              backgroundColor: 'transparent',
              borderColor: 'white',
              borderWidth: 1,
            }}
            type="solid"
            title="Login"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.touchIcon} onPress={_fbAuth}>
            <Image source={ICONS.fb} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchIcon}>
            <Image source={ICONS.gmail} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchIcon}>
            <Image source={ICONS.twitter} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.isAcount}>
          <Text style={{fontSize: FontSize.size15, color: Color.white}}>
            New Here?
          </Text>
          <TouchableOpacity
            onPress={() =>
              Navigation.push(props.componentId, {
                component: {
                  name: 'RegistrationScreen',
                },
              })
            }>
            <Text style={styles.txtIsAcount}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: perfectSize(30),
  },
  header: {
    marginTop: perfectSize(350),
    flex: 1,
  },
  main: {
    flex: 5,
  },
  text_header: {
    color: '#2F80ED',
    fontWeight: 'bold',
    fontSize: perfectSize(30),
  },
  textInput: {
    padding: perfectSize(5),
    marginTop: perfectSize(10),
    fontSize: perfectSize(14),
    color: '#2F80ED',

    fontFamily: fontFamily.light,
  },
  input: {
    marginHorizontal: perfectSize(3),
  },
  btnConfirm: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    color: '#fff',
  },
  isAcount: {
    flexDirection: 'row',
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  txtIsAcount: {
    color: Color.white,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: FontSize.size16,
  },
  touchIcon: {
    marginTop: perfectSize(20),
    marginLeft: perfectSize(10),
    borderRadius: perfectSize(15),
    width: perfectSize(50),
    height: perfectSize(50),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignContent: 'center',
  },
  icon: {
    width: perfectSize(30),
    height: perfectSize(30),
    marginTop: perfectSize(5),
  },
});
