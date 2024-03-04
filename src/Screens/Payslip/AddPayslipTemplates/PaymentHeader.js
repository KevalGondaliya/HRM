import {Icon} from 'react-native-elements';
import React, {Fragment, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {View, Text, TouchableOpacity} from 'react-native';

import Box from '../../../component/Box';

import styles from './style';

const PaymentHeader = props => {
  const [count, setCount] = useState(0);

  return (
    <Box
      label={'Content'}
      children={
        <Fragment>
          <View style={styles.headerLabelView}>
            <TouchableOpacity
              onPress={() => {
                props.setBasicSalary(!props.basicSalary);
              }}
              disabled={props.isView ? true : false}
              style={styles.paymentMappingMainView}>
              <View style={styles.checkIconView}>
                {props.basicSalary && (
                  <Icon name={'check'} type={'entypo'} size={scale(12)} />
                )}
              </View>

              <Text style={styles.labelTxt}>Basic Salary</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.setGrossSalary(!props.grossSalary);
              }}
              disabled={props.isView ? true : false}
              style={styles.paymentMappingMainView}>
              <View style={styles.checkIconView}>
                {props.grossSalary && (
                  <Icon name={'check'} type={'entypo'} size={scale(12)} />
                )}
              </View>

              <Text style={styles.labelTxt}>Gross Salary</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerLabelView}>
            <TouchableOpacity
              onPress={() => {
                props.setCpfDeductions(!props.cpfDeductions);
              }}
              disabled={props.isView ? true : false}
              style={styles.paymentMappingMainView}>
              <View style={styles.checkIconView}>
                {props.cpfDeductions && (
                  <Icon name={'check'} type={'entypo'} size={scale(12)} />
                )}
              </View>

              <Text style={styles.labelTxt}>CPF Deductions</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.setEmployerCPF(!props.employerCPF);
              }}
              disabled={props.isView ? true : false}
              style={styles.paymentMappingMainView}>
              <View style={styles.checkIconView}>
                {props.employerCPF && (
                  <Icon name={'check'} type={'entypo'} size={scale(12)} />
                )}
              </View>

              <Text style={styles.labelTxt}>Employer’s CPF</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerLabelView}>
            <TouchableOpacity
              onPress={() => {
                props.setBonus(!props.bonus);
              }}
              disabled={props.isView ? true : false}
              style={styles.paymentMappingMainView}>
              <View style={styles.checkIconView}>
                {props.bonus && (
                  <Icon name={'check'} type={'entypo'} size={scale(12)} />
                )}
              </View>

              <Text style={styles.labelTxt}>Bonus</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.setIsAllowances(!props.isAllowances);
              }}
              disabled={props.isView ? true : false}
              style={styles.paymentMappingMainView}>
              <View style={styles.checkIconView}>
                {props.isAllowances && (
                  <Icon name={'check'} type={'entypo'} size={scale(12)} />
                )}
              </View>

              <Text style={styles.labelTxt}>Allowances</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerLabelView}>
            <TouchableOpacity
              onPress={() => {
                props.setClaims(!props.claims);
              }}
              disabled={props.isView ? true : false}
              style={styles.paymentMappingMainView}>
              <View style={styles.checkIconView}>
                {props.claims && (
                  <Icon name={'check'} type={'entypo'} size={scale(12)} />
                )}
              </View>

              <Text style={styles.labelTxt}>Claims</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.setDeductions(!props.deductions);
              }}
              disabled={props.isView ? true : false}
              style={styles.paymentMappingMainView}>
              <View style={styles.checkIconView}>
                {props.deductions && (
                  <Icon name={'check'} type={'entypo'} size={scale(12)} />
                )}
              </View>

              <Text style={styles.labelTxt}>Deductions</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerLabelView}>
            <TouchableOpacity
              onPress={() => {
                props.setCdacMbmfSinda(!props.CdacMbmfSinda);
              }}
              disabled={props.isView ? true : false}
              style={styles.paymentMappingMainView}>
              <View style={styles.checkIconView}>
                {props.CdacMbmfSinda && (
                  <Icon name={'check'} type={'entypo'} size={scale(12)} />
                )}
              </View>

              <Text style={styles.labelTxt}>CDAC/MBMF/ SINDA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                props.setLeaveBreakdown(!props.leaveBreakdown);
              }}
              disabled={props.isView ? true : false}
              style={styles.paymentMappingMainView}>
              <View style={styles.checkIconView}>
                {props.leaveBreakdown && (
                  <Icon name={'check'} type={'entypo'} size={scale(12)} />
                )}
              </View>

              <Text style={styles.labelTxt}>Show Leave Breakdown</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerLabelView}>
            <TouchableOpacity
              onPress={() => {
                props.setOvertimeBreakdown(!props.overtimeBreakdown);
              }}
              disabled={props.isView ? true : false}
              style={styles.paymentMappingMainView}>
              <View style={styles.checkIconView}>
                {props.overtimeBreakdown && (
                  <Icon name={'check'} type={'entypo'} size={scale(12)} />
                )}
              </View>

              <Text style={styles.labelTxt}>Show Overtime Breakdown</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.borderView} />

          <Text style={styles.paymentTxt}>PAYMENT</Text>

          <View style={styles.branchNameView}>
            <Text style={[styles.branchNameTxt, styles.width15]}>Salary</Text>
            <View style={[styles.dotView, styles.width68]}></View>
            <Text
              numberOfLines={1}
              style={[styles.branchNameTxt1, styles.width17]}>
              {props.salary ? props.salary : 0}
            </Text>
          </View>

          <View style={styles.branchNameView}>
            <Text style={[styles.branchNameTxt, styles.width15]}>Bonus</Text>
            <View style={[styles.dotView, styles.width68]}></View>
            <Text
              numberOfLines={1}
              style={[styles.branchNameTxt1, styles.width17]}>
              {props.bounus ? props.bounus : 0}
            </Text>
          </View>

          <View style={styles.branchNameView}>
            <Text style={[styles.branchNameTxt, {width: '25%'}]}>
              Allowances
            </Text>
            <View style={[styles.dotView, {width: '58%'}]}></View>
            <Text
              numberOfLines={1}
              style={[styles.branchNameTxt1, styles.width17]}>
              {props.allowances ? props.allowances : 0}
            </Text>
          </View>

          <View style={styles.branchNameView}>
            <Text style={[styles.branchNameTxt, {width: '20%'}]}>Overtime</Text>
            <View style={[styles.dotView, {width: '63%'}]}></View>
            <Text
              numberOfLines={1}
              style={[styles.branchNameTxt1, styles.width17]}>
              {props.overtime ? props.overtime : 0}
            </Text>
          </View>

          <View style={styles.salaryBoxView}>
            <Text style={styles.paymentTxt}>Salary</Text>

            <View style={styles.labelView}>
              <View style={{width: '35%'}}>
                <Text style={styles.annualTxt}></Text>
                <Text style={styles.annualTxt}>Annual</Text>
                <Text style={styles.annualTxt}>Medical</Text>
                <Text style={styles.annualTxt}>Childcare</Text>
                <Text style={styles.annualTxt}>Maternity</Text>
                <Text style={styles.annualTxt}>Hospitalisation</Text>
              </View>
              <View style={styles.priceView}>
                <View style={styles.enntitledTxtView}>
                  <Text style={[styles.annualTxt, {lineHeight: scale(15)}]}>
                    Entitled
                  </Text>
                  <View>
                    <Text style={styles.annualTxt}>-</Text>
                  </View>
                </View>
                <View style={styles.takenTxtView}>
                  <Text style={[styles.annualTxt, {lineHeight: scale(15)}]}>
                    Taken
                  </Text>
                </View>
                <View style={styles.remainingTxtView}>
                  <Text style={[styles.annualTxt, {lineHeight: scale(15)}]}>
                    Remaining
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Fragment>
      }
    />
  );
};

export default PaymentHeader;
