import { View, Text } from 'react-native'

export default function CustomFormartDate({DocDate}) {
    const date = new Date(DocDate);
    const formattedDate = date.toLocaleDateString();
  return (
    <View>
      <Text>{formattedDate}</Text>
    </View>
  )
}