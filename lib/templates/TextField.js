import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const makeStyles = ({showError, isFocusing, editable}) =>
  StyleSheet.create({
    container: {
      ...(!editable && {opacity: 0.5}),
    },
    label: {marginBottom: 4, fontWeight: 'bold'},
    textInput: {
      borderWidth: 1,
      borderColor: isFocusing ? '#007bff' : 'lightgrey',
      padding: 8,
      borderRadius: 4,
      ...(showError && {borderColor: 'red'}),
      ...(!editable && {backgroundColor: '#EEEEEE'}),
    },
    errorText: {color: 'red', fontSize: 12},
  });

class TextField extends React.Component {
  state = {};

  render() {
    const {
      touched,
      errorText,
      label,
      value,
      onChange,
      editable = true,
    } = this.props;
    const {isFocusing} = this.state;

    const showError = touched && errorText;
    const styles = makeStyles({showError, isFocusing, editable});

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          editable={editable}
        />
        {showError && <Text style={styles.errorText}>{errorText}</Text>}
      </View>
    );
  }

  handleFocus = () => this.setState({isFocusing: true});

  handleBlur = () => {
    this.setState({isFocusing: false});
    this.props.onBlur();
  };
}

export default TextField;
