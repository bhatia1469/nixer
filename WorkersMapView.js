import React, { useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import styles, { fonts } from '../components/styles';
import { useNavigation } from '@react-navigation/native';
import MapView, { Callout } from 'react-native-maps';
import AppHeader from '../components/AppHeader';
import { Marker } from 'react-native-maps';
import colors from '../components/colors';

export default function WorkersMapView({ route }) {
    const navigation = useNavigation();
    const { name } = route.params


    function onCross() {
        navigation.goBack()
    }

    function circleImage() {
        return <View style={{ borderRadius: 30 }}>
            <Image style={[{
                borderRadius: 30, height: 60, width: 60, resizeMode: null
            }]} source={require('../assets/icons/demo-image.jpeg')} />
        </View>
    }

    return (
        <View style={styles.container}>
            <AppHeader
                title={name}
                leftIcon={require('../assets/icons/back.png')}
                onLeftPress={() => navigation.goBack()}
            />
            <View style={{ flex: 1 }}>
                <MapView
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{ flex: 1 }}
                >
                    <Marker coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }} >

                        <View style={[styles.iconProfile, { alignItems: 'center', justifyContent: 'center' }]}>
                            <Image style={[styles.icon60, { borderRadius: 30, overflow: 'hidden', resizeMode: 'cover' }]} source={require('../assets/icons/demo-image.jpeg')} />
                        </View>
                        <Callout tooltip={true}>
                            <View style={[styles.row, {
                                backgroundColor: 'white', elevation: 4,
                                padding: 10, borderRadius: 8, width: 330, height: 100
                            }]}>
                                <Text style={{ marginStart: 10 }}>
                                    <Text style={{ borderRadius: 30, overflow: 'hidden' }}>
                                        <Image style={[{
                                            borderRadius: 30, height: 60, width: 60, resizeMode: null
                                        }]} source={{ uri: 'https://i.imgur.com/5tDguZe.jpg' }} />
                                    </Text>
                                    {"\n"}
                                    {"\n"}
                                    {"\n"}

                                </Text>
                                <View style={{ marginStart: 20 }}>
                                    <Text style={{ fontFamily: fonts.semibold, fontSize: 20 }}>Matt Ryan</Text>
                                    <Text style={{ fontFamily: fonts.regular }}>Electrician</Text>
                                    <Text> <Image source={require('../assets/icons/pin.png')} style={styles.icon20} />
                                        <Text style={{ color: '#cacaca', fontFamily: fonts.regular, marginStart: 10 }}>  BallyBane, Co. Galway</Text></Text>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: 'space-between', marginStart: 10 }}>
                                    <Text>
                                        <Image style={[styles.icon40]} source={require('../assets/icons/star-rating.png')} />
                                        {"\n"}
                                    </Text>
                                    <Text style={[{ fontFamily: fonts.bold, color: colors.default }]}>4.5</Text>
                                </View>
                            </View>
                        </Callout>
                    </Marker>

                </MapView>

                <Pressable onPress={onCross} style={{
                    height: 50, position: 'absolute', alignItems: 'center',
                    justifyContent: 'center', width: 50, top: 10, right: 10, borderRadius: 8, backgroundColor: colors.default
                }}>
                    <Image style={{ resizeMode: 'contain', height: 25, width: 25 }} source={require('../assets/icons/close.png')} />
                </Pressable>
            </View>
        </View >
    )
}