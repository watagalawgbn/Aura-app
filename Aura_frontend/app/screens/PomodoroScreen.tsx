import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import BackButton from '../components/BackButton';

const PomodoroScreen = () => {
  return (
    <SafeAreaView style = {styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff"/>
        
        <BackButton title={"Study Smart"} />


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#ffffff",
    },
});

export default PomodoroScreen