import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MultiSelect from 'react-native-multiple-select'

const Dropdown = (items, value, setFieldValue) => {
  return (
    <MultiSelect
    hideTags
    items={items}
    uniqueKey="id"
    displayKey="name"
    single
    fixedHeight
    //  ref={(component) => { this.multiSelect = component }}
    onSelectedItemsChange={value => setFieldValue('city', value)}
    selectedItems={value}
    selectText="Pick City"
    searchInputPlaceholderText="Search Items..."
    onChangeInput={text => console.log(text)}
    altFontFamily="ProximaNova-Light"
    tagRemoveIconColor="#CCC"
    tagBorderColor="#CCC"
    tagTextColor="#CCC"
    selectedItemTextColor="#CCC"
    selectedItemIconColor="#CCC"
    itemTextColor="#000"
    searchInputStyle={styles.brandSearchInputStyle}
    submitButtonColor="#CCC"
    submitButtonText="Submit"
  />
  )
}

export default Dropdown

const styles = StyleSheet.create({})