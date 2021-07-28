import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import theme from '../../theme';
import moment from 'moment';
import capitalize from '../../utils/capitalize';

const MatchCard = ({ match, onPress }) => (
  <TouchableHighlight
    underlayColor={theme.inactiveGrey}
    onPress={onPress}
    style={{
      backgroundColor: theme.activeWhite,
      width: '80%',
      height: 70,
      borderRadius: 6,
      margin: 10,
      display: 'flex',
      justifyContent: 'center',
    }}>
    <View style={{ display: 'flex', flexDirection: 'row',  height: '100%' }}>
      <View style={{ display: 'flex', flexDirection: 'column', borderRightStyle: 'solid', borderRightColor: 'black', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center', width: 80 }}>
        <Text style={{}}>{moment(match.time).format("Do MMM")}</Text>
        <Text style={{}}>{moment(match.time).format("HH:mm")}</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 80, marginLeft: 10 }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{  fontSize: 18, fontWeight: 'bold', marginRight: 6 }}>-</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 6 }}>{capitalize(match.homeName)}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 6 }}>-</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight: 6 }}>{capitalize(match.awayName)}</Text>
        </View>
      </View>
    </View>
  </TouchableHighlight>
);

export default MatchCard