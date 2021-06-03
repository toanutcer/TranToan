import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {fontFamily, MetricsSizes} from '../../Themes';
import {Chip} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import {useTranslation} from 'react-i18next';
import '../../I18n';
const DATA = [
  {
    ID: 1,
    TEN: 'TOAN',
    SCREEN: 'HomeScreen',
  },
  {
    ID: 2,
    TEN: 'Màn Hình Form',
    SCREEN: 'LogInScreen',
  },
  {
    ID: 3,
    TEN: 'Date Picker Screen',
    SCREEN: 'DatePickerScreen',
  },
  {
    ID: 4,
    TEN: 'Modal Screen',
    SCREEN: 'ModalScreen',
  },
  {
    ID: 5,
    TEN: 'Bottom Tab',
    SCREEN: 'BottomTabScreen',
  },
  {
    ID: 6,
    TEN: 'NAM',
    SCREEN: 'PlayScreen',
  },
];
const App = props => {
  const {t, i18n} = useTranslation();
  const renderItem = ({item}) => (
    <View>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          Navigation.push(props.componentId, {
            component: {
              name: `${item.SCREEN}`,
            },
          })
        }>
        <Text style={styles.itemText}>{t(`${item.TEN}`)}</Text>
        <Chip title={t('Xem thêm')} />
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.ID}
      />
      <View style={styles.controlText}>
        <TouchableOpacity
          onPress={() => {
            i18n.changeLanguage('en');
          }}>
          <Text style={styles.text}>Tiếng Anh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            i18n.changeLanguage('vi');
          }}>
          <Text style={styles.text}>Tiếng Việt</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 5,
    marginVertical: 4,
    borderRadius: 20,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  itemText: {
    padding: 10,
    flex: 8,
  },
  itemIcon: {
    flex: 2,
  },
  title: {
    fontSize: 32,
  },
  controlText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    height: 50,
  },
  text: {
    padding: 5,
    fontFamily: fontFamily.italic,
  },
});

export default App;
