import {yupResolver} from '@hookform/resolvers/yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import ComponentInput from '../../../Components/ComponentInput';
import {
  Color,
  fontFamily,
  FontSize,
  ICONS,
  IMAGES,
  PERFECTSIZE,
} from '../../../Themes';

const schema = yup.object().shape({
  fullName: yup.string().required('Vui lòng nhập tên '),
  user: yup
    .string()
    .email('Không phải địa chỉ email')
    .required('Vui lòng nhập email'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
  re_password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .oneOf([yup.ref('password'), null], 'Mật khẩu phải trùng khớp'),
});
export default function App(props) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(schema)});
  const [date, setDate] = React.useState(new Date(Date.now()));
  const [mode, setMode] = React.useState('date');
  const [show, setShow] = React.useState(false);
  const [day, setDay] = React.useState(date.getDate());
  const [month, setMonth] = React.useState(date.getMonth() + 1);
  const [year, setYear] = React.useState(date.getFullYear());

  const changeTime = date => {
    setDay(date.getDate());
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
  };
  const onSubmit = data => console.log(data);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    changeTime(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  React.useEffect(() => {
    function Toast() {
      Toast.show({
        text1: 'Hello',
        text2: 'This is some something 👋',
      });
    }
  }, []);

  return (
    <ImageBackground source={IMAGES.bgLogin} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Register</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.mainInput}>
          <View>
            <Text style={styles.textInput}>Full Name </Text>
            <View style={styles.input}>
              <ComponentInput
                placeholder="Enter your full name"
                control={control}
                name="fullName"
                errors={errors}
                isShow={false}
              />
            </View>
          </View>
          <View>
            <Text style={styles.textInput}>Email </Text>
            <View style={styles.input}>
              <ComponentInput
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                control={control}
                name="password"
                errors={errors}
                isShow={true}
              />
            </View>
          </View>
          <View>
            <Text style={styles.textInput}>Re-password</Text>
            <View style={styles.input}>
              <ComponentInput
                placeholder="Enter re password"
                control={control}
                name="re_password"
                errors={errors}
                isShow={true}
              />
            </View>
          </View>
          <View style={styles.choosenDate}>
            <Text style={styles.textInput}>Ngày Sinh</Text>
            <TouchableOpacity
              onPress={showDatepicker}
              style={{
                ...styles.input,
                marginLeft: PERFECTSIZE(100),
                width: PERFECTSIZE(180),
                borderWidth: 1,
                borderRadius: 20,
                borderColor: '#2F80ED',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.textInput}>
                {day}-{month}-{year}
              </Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>
        <View style={styles.btnConfirm}>
          <Button
            buttonStyle={{
              width: PERFECTSIZE(150),
              height: PERFECTSIZE(60),
              backgroundColor: 'transparent',
              borderColor: 'white',
              borderWidth: 1,
              borderRadius: PERFECTSIZE(15),
            }}
            type="solid"
            title="Register"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.touchIcon}>
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
            Already Member?
          </Text>
          <TouchableOpacity onPress={() => Navigation.pop(props.componentId)}>
            <Text style={styles.txtIsAcount}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PERFECTSIZE(30),
  },
  header: {
    marginTop: PERFECTSIZE(50),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  main: {
    marginTop: PERFECTSIZE(80),
    flex: 7,
  },
  text_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: PERFECTSIZE(30),
  },
  textInput: {
    padding: PERFECTSIZE(5),
    marginTop: PERFECTSIZE(10),
    fontSize: PERFECTSIZE(14),
    color: 'black',
    fontWeight: '700',

    fontFamily: fontFamily.light,
  },
  input: {
    marginHorizontal: PERFECTSIZE(3),
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
    marginTop: PERFECTSIZE(20),
    marginLeft: PERFECTSIZE(10),
    borderRadius: PERFECTSIZE(15),
    width: PERFECTSIZE(50),
    height: PERFECTSIZE(50),
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
    width: PERFECTSIZE(30),
    height: PERFECTSIZE(30),
    marginTop: PERFECTSIZE(5),
  },
  choosenDate: {
    flexDirection: 'row',
    marginTop: PERFECTSIZE(20),
  },
});
