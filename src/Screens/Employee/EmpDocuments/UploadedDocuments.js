import React from 'react';
import {SvgXml} from 'react-native-svg';
import {Icon} from 'react-native-elements';
import {scale} from 'react-native-size-matters';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Colors from '../../../theme';
import Box from '../../../component/Box';
import eye from '../../../assets/svg/eye.svg';
import DataTable from '../../../component/DataTable';
import noUploadDoc from '../../../assets/svg/noUploadDoc.svg';
import {useSelector} from 'react-redux';
const UploadedDocuments = props => {
  const isLoading = useSelector(
    state => state.loading.effects.uploadDocument.delDocument,
  );
  const renderItem = ({item, index}) => {
    return (
      <View
        style={[
          styles.headerStyle,
          styles.tbView,
          {
            backgroundColor: index % 2 == 1 ? Colors.grey : Colors.white,
          },
        ]}>
        <View style={[styles.headerDate]}>
          <Text numberOfLines={1} style={[styles.userNameTxt]}>
            {item.doc_name}
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <View style={styles.iconMainView}>
            {/* <TouchableOpacity>
              <Icon
                name={'edit'}
                type={'materialicons'}
                color={Colors.blackPearl}
                size={styles.editIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <SvgXml xml={eye} width={scale(22)} height={scale(22)} />
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => props.onDelete(item)}>
              {isLoading && item.id == props.delId ? (
                <ActivityIndicator color={Colors.blackPearl} size={'small'} />
              ) : (
                <Icon
                  name={'delete'}
                  type={'materialicons'}
                  color={Colors.blackPearl}
                  size={styles.editIcon}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <Box
      label={'Uploaded Documents'}
      children={
        <DataTable
          data={props.data?.slice(props.prve, props.next)}
          renderItem={renderItem}
          style={{height: scale(180)}}
          isPaginate
          noData={
            <View style={styles.noDocIconView}>
              <SvgXml xml={noUploadDoc} width={scale(65)} height={scale(65)} />

              <Text style={styles.noDocTxt}>No Documents Yet</Text>
            </View>
          }
        />
      }
      childrenStyle={styles.childrenStyle}
    />
  );
};
const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerDate: {
    width: scale(160),
    height: '100%',
    justifyContent: 'center',
  },
  headerIcon: {
    width: scale(110),
    height: '100%',
    justifyContent: 'center',
  },
  userNameTxt: {
    fontSize: scale(12),
    color: Colors.sBlack,
    fontWeight: '500',
  },
  iconMainView: {
    width: '95%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tbView: {
    paddingHorizontal: scale(15),
    height: scale(40),
  },
  editIcon: scale(20),
  noDocIconView: {
    height: scale(150),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: scale(290),
  },
  noDocTxt: {
    fontSize: scale(12),
    fontWeight: '600',
    color: Colors.blackPearl,
    lineHeight: scale(25),
  },
  childrenStyle: {paddingHorizontal: 0, paddingVertical: 0},
});
export default UploadedDocuments;
