import React, { useEffect } from 'react';
import { ToggleButton, TextInput } from 'react-native-paper';
import { moderateScale } from "react-native-size-matters";
export default ToggleIncrementButton = ({ decrementLevel, incrementLevel, value, setValue }) => {
    return (
        <>
            <ToggleButton.Row onValueChange={e => { if (value > decrementLevel && value <= incrementLevel) setValue(value + parseInt(e)) }} value={value} style={{ height: 41.9 }}>
                <ToggleButton icon="minus" value={"-1"} style={{ borderColor: "#fff" }} />
                <TextInput
                    value={value.toString()}
                    onChangeText={e => setValue(e)}
                    keyboardType='numeric'
                    mode="outlined"
                    disabled
                    style={{ width: 41, height: 39, top: -7, textAlign: "center", backgroundColor: "#fff" }}
                // outlineColor="transparent"
                />
                <ToggleButton icon="plus" value={"+1"} style={{ borderColor: "#fff" }} />
            </ToggleButton.Row></>
    )
}