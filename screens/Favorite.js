import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import ContactThumbnail from '../components/ContactThumbnail'; 
import { fetchContacts } from '../utils/api'; 

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchContacts()
            .then((contacts) => {
                setContacts(contacts);
                setLoading(false);
                setError(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
                setError(true);
            });
    }, []);

    const renderFavoriteThumbnail = ({ item }) => {
        const { avatar } = item;
        return (
            <ContactThumbnail
                avatar={avatar}
                onPress={() => navigation.navigate('Profile', { contact: item })}
                style={styles.thumbnail} 
            />
        );
    };

    const favorites = contacts.filter((contact) => contact.favorite);
    
    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color="blue" />}
            {error && <Text>Error fetching contacts...</Text>}
            {!loading && !error && favorites.length === 0 && (
                <Text style={styles.emptyText}>No favorite contacts found.</Text>
            )}
            {!loading && !error && favorites.length > 0 && (
                <FlatList
                    data={favorites}
                    keyExtractor={keyExtractor}
                    numColumns={3} 
                    contentContainerStyle={styles.list}
                    renderItem={renderFavoriteThumbnail}
                />
            )}
        </View>
    );
};

export default Favorites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    list: {
        justifyContent: 'center', 
    },
    thumbnail: {    
        width: Dimensions.get('window').width / 3 - 20, 
        height: Dimensions.get('window').width / 3 - 20, 
        margin: 10, 
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
    },
});

