import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

const CategoryGridTile = props => {
    return (
        <TouchableOpacity style={styles.gridItemStyle} onPress={props.onSelect}>
            <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
        </TouchableOpacity>);
};

const styles = StyleSheet.create({
    gridItemStyle: {
        flex: 1,
        margin: 15,
        height: 150,
    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor:'black',
        shadowOpacity:0.26,
        elevation: 3,
        padding: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 20
    }
});


export default CategoryGridTile;