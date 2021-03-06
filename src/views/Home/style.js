import React from 'react';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  scrollview: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 20,
  },
  Searchbar: {
    marginBottom: 15,
    width: '95%',
    borderWidth: 1,
    borderColor: 'grey',
    shadowColor: 'white',
    borderRadius: 10,
    // marginLeft: -15,
  },
  categoriestext: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  categoriesImage: {
    width: 90,
    height: 50,
    borderRadius: 5,
  },
  sectionview: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  sectionbar: {
    backgroundColor: 'red',
    color: 'red',
    marginRight: 10,
  },
  sectiontext: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: 'black',
  },
  imagebackground: {
    width: 80,
    height: 80,
    overflow: 'hidden',
    borderRadius: 5,
    justifyContent: 'center',
  },
  boxview: {
    marginRight: 15,
    marginTop: 2,
    marginLeft: 1,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: '#fff',
  },
  bygradetext: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bybrandimage: {
    width: 90,
    height: 40,
    borderRadius: 5,
    alignSelf: 'center',
  },
  todaysimage: {
    width: 90,
    height: 100,
    borderRadius: 5,
  },
  todaystext: {
    color: '#66cdaa',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    borderWidth: 1,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    borderRadius: 3,
    backgroundColor: '#f0f8ff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 3,
    borderColor: 'lightgrey',
  },
});

export default style;
