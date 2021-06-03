import {StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {AniScreen, HomeScreen, PlayScreen, ProfileScreen} from '../Containers';
import {DatePickerScreen, ModalScreen} from '../Containers/CaiNayDungDeTest';
import LogInScreen from '../Containers/CaiNayDungDeTest/Form/LogIn';
import RegistrationScreen from '../Containers/CaiNayDungDeTest/Form/Registration';
import {IMAGES} from '../Themes';

Navigation.registerComponent('AniScreen', () => AniScreen);
Navigation.registerComponent('HomeScreen', () => HomeScreen);
Navigation.registerComponent('PlayScreen', () => PlayScreen);
Navigation.registerComponent('ProfileScreen', () => ProfileScreen);

//Cái này dùng để test
Navigation.registerComponent('LogInScreen', () => LogInScreen);
Navigation.registerComponent('RegistrationScreen', () => RegistrationScreen);
Navigation.registerComponent('ModalScreen', () => ModalScreen);
Navigation.registerComponent('DatePickerScreen', () => DatePickerScreen);

LogInScreen.options = {topBar: {visible: false, height: 0}};
RegistrationScreen.options = {topBar: {visible: false, height: 0}};
AniScreen.options = {
  topBar: {
    title: {
      text: 'Animation',
    },
    background: {
      color: '#4d08',
    },
  },
  bottomTab: {
    text: 'Animation',
    icon: IMAGES.add_image,
  },
};
HomeScreen.options = {
  topBar: {
    title: {
      text: 'HomeScreen',
    },
    background: {
      color: '#4d08',
    },
  },
  bottomTab: {
    text: 'HomeScreen',
    icon: IMAGES.add_image,
  },
};

PlayScreen.options = {
  topBar: {
    title: {
      text: 'PlayScreen',
    },
    background: {
      color: '#4d089a',
    },
  },
  bottomTab: {
    text: 'PlayScreen',
  },
};
ProfileScreen.options = {
  topBar: {
    title: {
      text: 'ProfileScreen',
    },
    background: {
      color: '#4d089a',
    },
  },
  bottomTab: {
    text: 'ProfileScreen',
  },
};

Navigation.setDefaultOptions({
  root: {
    statusBar: {visible: true},
    largeTitle: {visible: true},
  },
  topBar: {},
  bottomTab: {},
});
Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'AniScreen',
            },
          },
        ],
      },
    },
  });
});
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
});
