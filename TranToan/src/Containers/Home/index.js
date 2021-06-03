import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  Touchable,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {useTranslation} from 'react-i18next';
import 'i18n';
import {IMAGES} from '../../Themes';
function index(props) {
  const {t, i18n} = useTranslation();
  return (
    <ImageBackground source={IMAGES.loan} style={{width: 500, height: 500}}>
      <Button
        title="Push Settings Screen"
        color="#710ce3"
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: 'PlayScreen',
            },
          })
        }
      />
      <View style={styles.sectionWrapper}>
        <Text style={styles.heading}>{t('hello')}</Text>
        <Text style={styles.heading}>{t('ten')}</Text>
        <Text style={styles.regularText}>{t('message')}</Text>
      </View>
      <View style={{margin: 50}}>
        <Button
          title={t('Change language')}
          onPress={() => {
            i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');
          }}
        />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f3f3f3',
    flex: 1,
  },
  sectionWrapper: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'left',
  },
  regularText: {
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default index;
