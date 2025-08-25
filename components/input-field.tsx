import React from 'react';
import type { TextInputProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';

function InputField(props: TextInputProps) {
    return (
        <TextInput
            {...props}
            style={[styles.input, props.style]}
            placeholderTextColor="#6b7280"
        />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 60,
        width: '100%',
        minWidth: 0,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#27272a',
        paddingHorizontal: 12,
        paddingVertical: 4,
        fontSize: 16,
        backgroundColor: '#1a1a1a',
        color: '#f3f4f6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        marginTop: 8,
        marginBottom: 8,
    },
});

export default InputField;