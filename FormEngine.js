import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, StyleSheet } from "react-native";
import produce from "immer";
import lodash from "lodash";
import validate from "validate.js";

const templates = {
    'TextField': ({
        label,
        onChange,
        hasError,
        errorText,
        touched,
        ...rest
    }) => {
        const showError = touched && hasError;
        const styles = StyleSheet.create({
            wrapper: { marginBottom: 16 },
            label: { marginBottom: 4, fontWeight: 'bold' },
            textInput: { borderWidth: 1, borderColor: 'lightgrey', padding: 8, borderRadius: 4, ...showError && { borderColor: 'red' } },
            errorText: { color: 'red', fontSize: 12 }
        });

        return <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={onChange}
                {...rest}
            />
            {showError && <Text style={styles.errorText}>{errorText}</Text>}
        </View>
    }
}

const constraints = {
    email: { email: { message: '^INVALID_EMAIL' } }
}

class FormEngine extends React.Component {
    state = {
        errors: {},
        touched: {}
    }

    render() {
        const { fields, value: currentState } = this.props;
        const { errors, touched } = this.state;

        return <>
            {fields.map(field => {
                const { template, path, options } = field;
                const Component = templates[template];
                const fieldValue = lodash.get(currentState, path);
                const errorText = (errors[path] || [])[0];
                const hasError = errorText !== undefined;

                return <Component
                    key={path}
                    value={fieldValue}
                    onChange={value => this.handleChange(path, value)}
                    onBlur={() => this.handleBlur(path)}
                    errorText={errorText}
                    hasError={hasError}
                    touched={touched[path]}
                    {...options}
                />
            })}
        </>
    }

    handleChange = (path, value) => {
        const { value: currentState, onChange } = this.props;
        const nextState = produce(
            currentState,
            draftState => lodash.set(draftState, path, value),
        );
        onChange(nextState);
        this.handleValidate(nextState);
    }

    handleValidate = (nextState) => {
        const errors = (validate(nextState, constraints) || {});
        this.setState({ errors });
    }

    handleBlur = path => {
        const touched = produce(this.state.touched, draftTouched => { draftTouched[path] = true });
        this.setState({ touched })

        const { value: currentState } = this.props;
        this.handleValidate(currentState);
    }
}

FormEngine.propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
}

export default FormEngine;