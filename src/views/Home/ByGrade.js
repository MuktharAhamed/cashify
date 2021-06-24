import React from 'react';
import {ScrollView, View, Text, TouchableNativeFeedback} from 'react-native';
import style from 'app-views/Home/style';

const lists = [
  {text: 'E', color: `#ffa500`},
  {text: 'D', color: `#6b8e23`},
  {text: 'C', color: `#ee82ee`},
  {text: 'B', color: `#87ceeb`},
  {text: 'A', color: `#00ff7f`},
];
const ByGrade = () => {
  return (
    <>
      <View style={style.sectionview}>
        <Text style={style.sectionbar}>' '</Text>
        <Text style={style.sectiontext}>By Grade</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginBottom: 10,
          height: 90,
        }}>
        {lists.map((e, index) => (
          <Subelements key={index} text={e.text} color={e.color} />
        ))}
      </ScrollView>
    </>
  );
};

const Subelements = ({text, color}) => {
  console.log(color, 'color');
  return (
    <View>
      <TouchableNativeFeedback>
        <View style={style.boxview}>
          <Text
            style={[
              {
                ...style.bygradetext,
                color: color,
              },
            ]}>
            {`Grade\n` + text}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default ByGrade;
