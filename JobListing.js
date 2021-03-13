import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import styles, { fonts } from '../components/styles';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';
import colors from '../components/colors';
import Button from '../components/Button';
import Api from '../apis/Api';
import moment from 'moment'

export default function JobListing({ route }) {
    const navigation = useNavigation();
    const [temp, setTemp] = useState(0)
    const [details, setDetails] = useState('')
    const { id } = route.params

    function onMessage() {
        let user = {
            image: details.user.image,
            email: details.user.email,
            name: details.user.name,
        }
        navigation.navigate('Chat', { otherUserDetails: user })
    }

    useEffect(() => {
        Api.jobDetails(id).then(res => {
            setDetails(res)
        })
    }, [])


    function setFav() {
        details.isFav = true
        setTemp(temp + 1)
        Api.addFav(id).then(res => { })
    }

    function removeFav() {
        details.isFav = false
        setTemp(temp + 1)
        Api.removeFav(id).then(res => { })
    }


    return (
        <View style={[styles.container]}>
            <AppHeader
                title="Job Listing"
                leftIcon={require('../assets/icons/back.png')}
                onLeftPress={() => navigation.goBack()}
                rightIcon={details.isFav ? require('../assets/icons/heart-filled.png') : require('../assets/icons/heart.png')}
                onRightPress={() => details.isFav ? removeFav() : setFav()}
            />

            <View style={[styles.containerJob, { margin: 20, paddingBottom: 40, paddingTop: 30, marginBottom: 0, marginVertical: null }]}>
                <Text style={{ fontFamily: fonts.bold, fontSize: 24, alignSelf: 'center' }}>{details.data?.title}</Text>
                <View style={[styles.rowCenter, { margin: 30, marginVertical: 40, flex: 1 }]}>
                    <Text style={{ color: '#cacaca', flex: 1, fontFamily: fonts.regular }}>{moment(details.data?.postedOn).format('MMM DD, YYYY')}</Text>
                    <View style={styles.row}>
                        <Image source={require('../assets/icons/pin.png')} style={styles.icon20} />
                        <Text style={{ color: '#cacaca', fontFamily: fonts.regular, marginStart: 10 }}>{details.data?.location}</Text>
                    </View>
                </View>
                <Text style={{ fontFamily: fonts.regular, alignSelf: 'center', color: colors.default }}>Job Description</Text>
                <Text style={{ color: colors.lightBlack, fontFamily: fonts.regular, margin: 10 }}>{details.data?.description}</Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title={"Message Customer"} onPress={onMessage} style={{ marginHorizontal: 40 }} />
            </View>

        </View>
    )
}