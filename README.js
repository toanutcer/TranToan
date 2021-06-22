import React, {useEffect, useState} from 'react';
import {StatusBar, Platform} from 'react-native';
import Router from '@navigator';
import {
  removeItemStorage,
  setStorage,
  getStorage,
  setMultiStorage,
} from '@common/index';
import {Config} from '@config/index';
import {Base, Lang} from '@stores/index';
import {auth} from '@services/index';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import {setLang} from '@assets/language/i18n';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import NavigationService from './src/common/NavigationService';


// const App: () => React$Node = () => {
const App = (props) => {
  const [isProcessing, setProcessing] = useState(true);
  useEffect(() => {
    init();
    setupFirebaseMessageListener();
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
      StatusBar.setHidden(false);
    }
  }, []);
  const init = async () => {
    Config.intro = await getStorage(Config.storage.intro);
    let lang_code = await getStorage(Config.storage.lang_code);
    if (lang_code !== null && lang_code !== Lang.isLang) {
      Config.lang_code = lang_code;
      setLang(Config.lang_code);
      Lang.setLang(Config.lang_code);
      await setStorage(Config.storage.lang_code, Config.lang_code);
    }
    await initVariables();
    await checkToken();
    setProcessing(false, SplashScreen.hide());

    await requestUserNotiPermisison();
  };

  const requestUserNotiPermisison = async () => {
    let settings = await messaging().requestPermission();
    if (settings) {
      await getFcmToken();
    }
  };

  // const defaultEnviroment = async () => {
  //   Config.intro = await getStorage(Config.storage.intro);
  // };

  const getFcmToken = async () => {
    Config.fcm_token = await getStorage(Config.storage.fcm_token);
    if (Config.fcm_token == null) {
      Config.fcm_token = await messaging().getToken();
      await setStorage(Config.storage.fcm_token, Config.fcm_token);
    }
  };

  const initDevice = async () => {
    let manufacturer = await DeviceInfo.getManufacturer();
    let deviceModel = DeviceInfo.getModel();
    let systemVersion = DeviceInfo.getSystemVersion();
    let device = await auth.init_device(
      Platform.OS,
      deviceModel,
      systemVersion,
      Config.version,
      manufacturer,
      Config.fcm_token,
    );

    if (device.data.code === 200) {
      Config.access_token = device?.data?.token;
      await setStorage(Config.storage.access_token, Config.access_token);
      Base.setIsLogin(true);
      Config.is_notify = device?.data?.is_notify.toString();
      Config.lang_code = device?.data?.lang_code.toString();
      Config.settings = JSON.stringify(device?.data?.settings);
      await setMultiStorage([
        [Config.storage.is_notify, Config.is_notify],
        [Config.storage.lang_code, Config.lang_code],
        [Config.storage.settings, Config.settings],
      ]);
    } else {
      Toast.show('error_request');
    }
  };

  const initVariables = async () => {
    let access_token = await getStorage(Config.storage.access_token);
    let is_login = await getStorage(Config.storage.is_login);
    let is_notify = await getStorage(Config.storage.is_notify);
    if (access_token !== null) {
      Config.access_token = access_token;
    }
    if (is_login !== null) {
      Config.is_login = is_login;
    }
    if (is_notify !== null) {
      Config.is_notify = is_notify;
    }
  };

  const checkToken = async () => {
    if (Config.access_token !== null) {
      let refresh_token = await auth.refresh_token();
      if (refresh_token.data.code === 200) {
        Config.access_token = refresh_token.data.token;
        await setStorage(Config.storage.access_token, Config.access_token);
      } else {
        Config.access_token = null;
        await removeItemStorage(Config.storage.access_token);
        await removeItemStorage(Config.storage.is_login);
      }
    } else {
      await initDevice();
    }
  };

  /******************************************************************************************************************************
   * Firebase
   * Sử dụng để yêu cầu người dùng cấp quyền push notification cho ứng dụng
   *
   ******************************************************************************************************************************/
  const setupFirebaseMessageListener = () => {
    // Check whether an initial notification is available
    // off app -> notification private, public
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          let notificationApp = remoteMessage;
          console.log(
            'Notification caused app to open from quit state ',
            JSON.stringify(remoteMessage),
          );
          setTimeout(() => {
            NavigationService.navigate('Notification');
          }, 500);
        }
      });

    // Listen when a new message arrives in the foreground mode
    messaging().onMessage(async (remoteMessage) => {
      console.log(
        'firebase/messaging A new FCM message arrived!',
        remoteMessage,
      );
    });

    // Listen when a new message arrives in the background & quit mode
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log(
        'firebase/messaging Message handled in the background!',
        remoteMessage,
      );
      NavigationService.navigate('Notification')
    });

    // When the application is running, but in the background.
    // Ẩn app
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'firebase/messaging Notification caused app to open from background state:',
        remoteMessage,
      );
      // navigation.navigate(remoteMessage.data.type);
      NavigationService.navigate('Notification');
    });
  };

  return (
    <>
      <NavigationContainer
        ref={(ref) => {
          if (ref) {
            navigator = ref;
            NavigationService.setTopLevelNavigator(ref);
          }
        }}>
        {isProcessing ? null : <Router />}
      </NavigationContainer>
    </>
  );
};

export default App;
