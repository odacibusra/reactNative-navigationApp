import React, { useEffect, useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/HeaderButton.js';
import DefaultText from '../components/DefaultText.js';
import { toggleFavorite } from '../store/actions/meals.js';

const ListItem = props => {
    return <View style={styles.listItem}>
        <Text>{props.children}</Text>
    </View>
}

const MealDetailsScreen = props => {
    const mealId = props.navigation.getParam('mealId');
    const availableMeals = useSelector(state => state.meals.meals);
    const currentMealIsFavorite = useSelector(state =>
        state.meals.favoriteMeals.some(meal => meal.id === mealId)
      );
    const selectedMeal = availableMeals.find(_ => _.id === mealId);
    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
      }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
    }, [toggleFavoriteHandler]);

    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealIsFavorite });
      }, [currentMealIsFavorite]);

    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <DefaultText>{selectedMeal.duration}m</DefaultText>
                <Text>{selectedMeal.complexity.toUpperCase()}</Text>
                <Text>{selectedMeal.affordability.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(c => <ListItem key={c}>{c}</ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(c => <ListItem key={c}>{c}</ListItem>)}
        </ScrollView>
    ); c
};

MealDetailsScreen.navigationOptions = (data) => {
    const title = data.navigation.getParam('mealTitle');
    const toggleFavorite = data.navigation.getParam('toggleFav');
    const isFavorite = data.navigation.getParam('isFav');
    return {
        headerTitle: title,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Favorite" iconName={isFavorite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavorite} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        textAlign: 'center'
    }
});

export default MealDetailsScreen;