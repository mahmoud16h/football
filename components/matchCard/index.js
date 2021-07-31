import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import theme from '../../theme';
import moment from 'moment';
import capitalize from '../../utils/capitalize';
import {rgbaColor} from 'react-native-reanimated/src/reanimated2/Colors';

const MatchCard = ({ match, onPress }) => {
  const isInPast = moment(match.time).isBefore(Date.now())
  const { awayScore, homeScore } = match
  const needsReview = isInPast && awayScore === null && homeScore === null

  const getColor = () => {
    switch (true){
      case (match.review === 'complete'):
        return 'transparent'
      case (needsReview):
        return rgbaColor(255, 135, 135, 0.3)
      default:
        return theme.activeWhite
    }
  }

  const getTextColor = () => {
    switch (true){
      case (needsReview):
      case (match.review === 'complete'):
        return theme.activeWhite
      default:
        return 'black'
    }
  }

  return (
    <TouchableHighlight
      underlayColor={theme.inactiveGrey}
      onPress={onPress}
      style={{
        borderColor: theme.activeWhite,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: getColor(),
        width: '80%',
        height: 70,
        borderRadius: 6,
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
      }}>
      <View style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          borderRightStyle: 'solid',
          borderRightColor: 'black',
          borderRightWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: 80
        }}>
          <Text style={{ color: getTextColor() }}>{moment(match.time).format("Do MMM")}</Text>
          <Text style={{ color: getTextColor() }}>{moment(match.time).format("HH:mm")}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 110, marginLeft: 10}}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginRight: 6, color: theme.inactiveGrey }}>{homeScore || '-'}</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 6, color: getTextColor()}}>{capitalize(match.homeName)}</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginRight: 6, color: theme.inactiveGrey }}>{awayScore || '-'}</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginRight: 6, color: getTextColor()}}>{capitalize(match.awayName)}</Text>
          </View>
        </View>
        {match.status === 'pending' && <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 140, marginLeft: 10}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginRight: 6, color: theme.inactiveGrey }}>pending</Text>
        </View>}
      </View>
    </TouchableHighlight>
  )
};

export default MatchCard