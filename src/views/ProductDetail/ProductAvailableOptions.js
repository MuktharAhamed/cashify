import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AvaialbleOptions from './AvaialbleOptions';
import * as Constants from 'app-constants/ProductConstants';
import styles from './style';
// import style from 'app-views/Home/style';
const ProductAvailableOptions = props => {
  const [allVariants, setAllAvailableVariants] = useState([]);
  const [allGrades, setAllGrades] = useState([]);
  const [allAvailableRam, setAllRam] = useState([]);
  const [allSize, setAllSize] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedRam, setSelectedRam] = useState({});
  const [selectedGrade, setSelectedGrade] = useState({});
  const [selectedSize, setSelectedSize] = useState({});

  const unique = (array, prop) => {
    const keyValueArray = array.map(entry => [entry[prop], entry]);
    const map = new Map(keyValueArray);
    return Array.from(map.values());
  };

  // const toggleExpand = groupName => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  //   setExpandedState(prev => {
  //     var newState = {...prev};
  //     newState[groupName] = !prev[groupName];
  //     return newState;
  //   });
  // };

  useEffect(() => {
    setAllAvailableVariants(props.allAvailableVariants);
    var ram = props.allAvailableVariants.map(s => {
      return {
        isSelected: props.selectedVariant.ram == s.ram,
        value: s.ram,
      };
    });
    setAllRam(unique(ram, 'value'));

    var size = [...props.allAvailableVariants]
      .filter(
        a =>
          a.ram.replace(/\s/g, '').toLowerCase() ==
          props.selectedVariant.ram.replace(/\s/g, '').toLowerCase(),
      )
      .map(s => {
        return {
          isSelected: props.selectedVariant.size == s.size,
          value: s.size,
        };
      });

    setAllSize(unique(size, 'value'));

    var grade = [...props.allAvailableVariants]
      .filter(
        a =>
          a.ram.replace(/\s/g, '').toLowerCase() ==
            props.selectedVariant.ram.replace(/\s/g, '').toLowerCase() &&
          a.size?.replace(/\s/g, '').toLowerCase() ==
            props.selectedVariant.size?.replace(/\s/g, '').toLowerCase(),
      )
      .map(s => {
        return {
          isSelected: props.selectedVariant.grade == s.grade,
          value: s.grade,
        };
      });
    setAllGrades(unique(grade, 'value'));
    setSelectedRam(props.selectedVariant.ram);
    setSelectedGrade(props.selectedVariant.grade);
    setSelectedSize(props.selectedVariant.size);
  }, []);

  const changeSelectedOption = (option, value) => {
    console.log('changeSelectedOption');
    console.log(props.allAvailableVariants);
    if (option == Constants.PRODUCT_RAM) {
      var allRam = allAvailableRam.map((s, index) => {
        return {
          isSelected: s.value == value,
          value: s.value,
        };
      });
      setAllRam(allRam);
      setSelectedRam(value);
      var size = [...props.allAvailableVariants]
        .filter(
          a =>
            a.ram.replace(/\s/g, '').toLowerCase() ==
            value.replace(/\s/g, '').toLowerCase(),
        )
        .map((s, index) => {
          console.log(index);
          return {
            isSelected: false,
            value: s.size,
          };
        });
      // size[0].isSelected = true;
      var filteredSizes = unique(size, 'value');
      filteredSizes[0].isSelected = true;
      setSelectedSize(filteredSizes[0].value);
      setAllSize(filteredSizes);

      var grade = [...props.allAvailableVariants]
        .filter(a =>
          a.ram?.replace(/\s/g, '').toLowerCase() ==
            value.replace(/\s/g, '').toLowerCase() && filteredSizes.length > 0
            ? a.size?.replace(/\s/g, '').toLowerCase() ==
              filteredSizes[0]?.value?.replace(/\s/g, '').toLowerCase()
            : true,
        )
        .map((s, index) => {
          return {
            isSelected: false,
            value: s.grade,
          };
        });
      var filterdGrades = unique(grade, 'value');
      filterdGrades[0].isSelected = true;
      setSelectedGrade(filterdGrades[0].value);
      setAllGrades(filterdGrades);
    } else if (option == Constants.PRODUCT_SIZE) {
      var allProductSize = allSize.map((s, index) => {
        return {
          isSelected: s.value == value,
          value: s.value,
        };
      });
      setAllSize(allProductSize);
      setSelectedSize(value);
      var grade = [...props.allAvailableVariants]
        .filter(
          a =>
            a.ram.replace(/\s/g, '').toLowerCase() ==
              selectedRam.replace(/\s/g, '').toLowerCase() &&
            a.size.replace(/\s/g, '').toLowerCase() ==
              value.replace(/\s/g, '').toLowerCase(),
        )
        .map((s, index) => {
          return {
            isSelected: false,
            value: s.grade,
          };
        });
      var allprodGrades = unique(grade, 'value');
      allprodGrades[0].isSelected = true;
      setSelectedGrade(allprodGrades[0].value);
      setAllGrades(allprodGrades);
    } else if (option == Constants.PRODUCT_GRADE) {
      var allProductGrade = allGrades.map((s, index) => {
        return {
          isSelected: s.value == value,
          value: s.value,
        };
      });
      setAllGrades(allProductGrade);
      setSelectedGrade(value);
    }
  };

  const confirmSelectedOption = () => {
    console.log('option');
    // console.log(option);
    console.log(selectedGrade);
    console.log(selectedRam);
    // if (option == 'SIZE') {
    //   setSelectedRam(value);
    props.changeVariantHandler(selectedRam, selectedSize, selectedGrade);
    setShowOptions(false);
    // } else if (option == 'GRADE') {
    //   props.changeVariantHandler(selectedRam.value, value);
    // }
  };

  const toggleOptionsModal = () => {
    console.log('toggleOptionsModal');
    setShowOptions(prev => !prev);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={toggleOptionsModal}>
        <View style={styles.availableOptionTitle}>
          <View style={{flex: 5}}>
            <Text>
              {'Grade ' +
                props.selectedVariant.grade +
                ' - ' +
                props.selectedVariant.ram +
                ' RAM /' +
                props.selectedVariant.size}
            </Text>
          </View>
          <View>
            <Icon name="arrow-right" size={20} color="black" type="entypo" />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <Modal
        // animationIn="slideInUp"
        // animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        onBackdropPress={toggleOptionsModal}
        isVisible={showOptions}
        swipeDirection="down"
        // hasBackdrop={true}
        transparent
        // backdropOpacity={0.5}
        // backdropColor={'rgba(0, 0, 0, 0.8)'}
        onSwipeComplete={toggleOptionsModal}
        style={styles.AvailableOptionModal}
        // onRequestClose={toggleOptionsModal}
      >
        <View style={styles.ModalContainer}>
          <AvaialbleOptions
            title={'RAM'}
            optionKey={Constants.PRODUCT_RAM}
            // expandedState={expandedState}
            availableOptions={allAvailableRam}
            changeVariant={changeSelectedOption}
          />
          <AvaialbleOptions
            title={'SIZE'}
            optionKey={Constants.PRODUCT_SIZE}
            // expandedState={expandedState}
            availableOptions={allSize}
            changeVariant={changeSelectedOption}
          />
          <AvaialbleOptions
            title={'GRADE'}
            optionKey={Constants.PRODUCT_GRADE}
            // expandedState={expandedState}
            availableOptions={allGrades}
            changeVariant={changeSelectedOption}
          />
          <View>
            <TouchableOpacity onPress={confirmSelectedOption}>
              <Text style={styles.SelectVariant}>Select Option</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProductAvailableOptions;
