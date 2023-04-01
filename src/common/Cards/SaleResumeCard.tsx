import { Text, View } from 'react-native';
import { FC } from 'react';

import { salesResume } from '../../styles/Global';

interface Props {
  title: string;
  value: number;
}

export const GumySaleResumeCard: FC<Props> = ({ title, value }) => {
  return value > 0 ? (
    <View style={salesResume.contentList}>
      <Text style={salesResume.listTitleText}>{title}</Text>
      <Text style={salesResume.listTotals}>$RD {value.toLocaleString()}</Text>
    </View>
  ) : (
    <></>
  );
};
