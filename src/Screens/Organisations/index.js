import {
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import React, {useEffect, useState} from 'react';
import DropShadow from 'react-native-drop-shadow';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Colors from '../../theme';
import Button from '../../component/Button';
import Header from '../../component/Header';
import eye from '../../assets/svg/whiteEye.svg';
import TextInput from '../../component/TextInput';
import ScreenDescription from '../../component/ScreenDescription';

import styles from './style';
import _ from 'lodash';

function Organisations({navigation}) {
  const dispatch = useDispatch();
  const [delId, setDelId] = useState('');
  const token = useSelector(state => state.session?.token);
  const organisationData = useSelector(state => state.organisations?.viewOrg);
  const isLoading = useSelector(
    state => state.loading.effects.organisations.getOrganisations,
  );
  const isDelLoding = useSelector(
    state => state.loading.effects.organisations.deleteOrg,
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch.company.get({token});
    // dispatch.organisations.getOrganisations({token});
  };

  const onDeleteBtnPress = id => {
    setDelId(id);
    dispatch.organisations.deleteOrg({
      token,
      id: id,
    });
  };

  const onEditIconPress = item => {
    navigation.navigate('AddOrganisations', {
      data: item,
      isEdit: true,
    });
  };

  const onEyeIconPress = item => {
    navigation.navigate('AddOrganisations', {
      data: item,
      isEdit: true,
      isView: false,
    });
  };

  const addOrgBtnPress = () => {
    navigation.navigate('AddOrganisations', {
      isEdit: false,
    });
  };

  const searchData = e => {
    dispatch.organisations.getOrganisations({token, e});
  };

  const debounce_fun = _.debounce(function (response) {
    searchData(response);
  }, 400);

  return (
    <SafeAreaView style={styles.containerView}>
      <Header
        isblank
        label={'Organisations'}
        labelStyle={styles.labelStyle}
        onMenuPress={() => {
          navigation.openDrawer();
        }}
      />
      <ScreenDescription
        description1={'Manage organisations within'}
        description2={'the company here. Click on the respective'}
        description3={'button to edit or view the details'}
      />

      <View style={styles.searchBtnView}>
        <View style={styles.searchIconView}>
          <Icon name={'search'} type={'evilIcons'} color={Colors.lightRed} />
          <TextInput
            style={styles.searchInput}
            placeholder={'Search Query…'}
            placeholderTextColor={Colors.lightRed}
            onChangeText={e => debounce_fun(e)}
          />
        </View>
        <Button
          label={'Add Organisation'}
          btnStyle={styles.cancelBtn}
          labelStyle={styles.addOrgTxt}
          onPress={addOrgBtnPress}
        />
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.keyboardAwareScrollView}>
        <FlatList
          data={organisationData}
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl onRefresh={getData} refreshing={isLoading} />
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <DropShadow style={styles.dropShadow}>
                <View style={styles.cardMainView}>
                  <View style={styles.orgNameView}>
                    <Text numberOfLines={1} style={styles.orgName}>
                      {item.org_name}
                    </Text>

                    <View style={styles.iconMainView}>
                      <TouchableOpacity onPress={() => onEditIconPress(item)}>
                        <Icon
                          name={'edit'}
                          type={'materialicons'}
                          color={Colors.white}
                          size={styles.editIcon}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => onEyeIconPress(item)}>
                        <SvgXml
                          xml={eye}
                          width={scale(22)}
                          height={scale(22)}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          onDeleteBtnPress(item.id);
                        }}
                        disabled={isDelLoding}>
                        {isDelLoding && delId == item.id ? (
                          <ActivityIndicator
                            size={'small'}
                            color={Colors.white}
                          />
                        ) : (
                          <Icon
                            name={'delete'}
                            type={'materialicons'}
                            color={Colors.white}
                            size={styles.editIcon}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text style={styles.idTxt}>{item.biz_reg_no}</Text>
                  <Text style={[styles.idTxt, {lineHeight: scale(22)}]}>
                    {item.add_line1 + `,`}
                    {item.add_line2 && item.add_line2 + `,`}
                    {item.add_line3}
                  </Text>
                  <Text style={styles.idTxt}>
                    {item.country}, {item.postal}
                  </Text>

                  <Text style={[styles.idTxt, {marginTop: scale(15)}]}>
                    #02-3F
                  </Text>
                </View>
              </DropShadow>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <>
                <View style={styles.noFoundTxtView}>
                  <Text style={styles.noFoundTxt}>No Data Found</Text>
                </View>
              </>
            );
          }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Organisations;
