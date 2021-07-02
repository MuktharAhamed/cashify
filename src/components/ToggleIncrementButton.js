import React, { useEffect } from 'react';
import { ToggleButton ,TextInput} from 'react-native-paper';

export default ToggleIncrementButton = ({ value, setValue }) => {
    return (
        <>
            <ToggleButton.Row onValueChange={e => setValue(e)} value={value} style={{overflow:"hidden"}}>
                <ToggleButton icon="plus" value={"1"} />
                <TextInput
                    value={value.toString()}
                    onChangeText={e => setValue(e)}
                    keyboardType='numeric'
                    mode="outlined"
                    disabled
                />
                <ToggleButton icon="minus" value={"-1"} />
            </ToggleButton.Row></>
    )
}