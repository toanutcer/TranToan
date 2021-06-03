import {yupResolver} from '@hookform/resolvers/yup';
import React from 'react';
import {useForm} from 'react-hook-form';
import {
  Alert,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Navigation} from 'react-native-navigation';
import * as yup from 'yup';
import ComponentInput from '../../../Components/ComponentInput';
import {fontFamily, IMAGES} from '../../../Themes';
const schema = yup.object().shape({
  fullName: yup.string().required('Vui lòng nhập tên '),
  user: yup
    .string()
    .email('Không phải địa chỉ email')
    .required('Vui lòng nhập email'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
  re_password: yup.string().required('Vui lòng nhập mật khẩu'),
});
export default function App(props) {
  const [date, setDate] = React.useState(new Date());
  //Modal
  const [isModalVisible, setModalVisible] = React.useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(schema)});
  const onSubmit = data => console.log(data);
  const ShowCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    Alert.alert(date + '-' + month + '-' + year);
  };
  return (
    <ImageBackground source={IMAGES.bgLogin} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Registration</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.mainInput}>
          <View>
            <Text style={styles.textInput}>Họ và tên :</Text>
            <View style={styles.input}>
              <ComponentInput
                control={control}
                name="fullName"
                errors={errors}
                isShow={false}
              />
            </View>
          </View>
          <View>
            <Text style={styles.textInput}>Gmail :</Text>
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
            <Text style={styles.textInput}>Mật khẩu :</Text>
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
            <Text style={styles.textInput}>Nhập lại mật khẩu :</Text>
            <View style={styles.input}>
              <ComponentInput
                control={control}
                name="re_password"
                errors={errors}
                isShow={true}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textInput}>Ngày tháng năm sinh :</Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={date} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="select date"
              format="DD-MM-YYYY"
              minDate="01-01-2016"
              maxDate="01-01-2019"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={date => {
                setDate(date);
              }}
            />
          </View>
          <View style={styles.btnConfirm}>
            <Button title="Đăng nhập" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.isAcount}
          onPress={() =>
            Navigation.push(props.componentId, {
              component: {
                name: 'LogInScreen',
              },
            })
          }>
          <Text style={styles.txtIsAcount}>Bạn đã có tài khoản ?</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 5,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  textInput: {
    padding: 5,
    marginTop: 10,
    fontSize: 14,

    fontFamily: fontFamily.light,
  },
  input: {
    marginHorizontal: 3,
  },
  btnConfirm: {
    marginTop: 50,
  },
  isAcount: {
    marginTop: 30,
    alignItems: 'center',
  },
  txtIsAcount: {
    color: '#fff',
    fontStyle: 'italic',
  },
  date: {
    width: '100%',
    backgroundColor: '#fff',
  },
  chosenDate: {
    backgroundColor: '#fff',
    marginRight: 5,
    marginTop: 10,
  },
});
