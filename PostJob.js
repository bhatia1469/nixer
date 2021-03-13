import React, { useState, useRef } from 'react';
import { View, ScrollView, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import styles, { fonts } from '../components/styles';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomTextInput from '../components/CustomTextInput';
import Button from '../components/Button';
import AppHeader from '../components/AppHeader';
import ReactNativeModal from 'react-native-modal';
import colors from '../components/colors';
import { color } from 'react-native-reanimated';
import Api from '../apis/Api';

const Stack = createStackNavigator();

export default function PostJob() {
    const navigation = useNavigation();
    const [name, setName] = useState("")
    const [step, setStep] = useState('1');


    const titleRef = useRef()
    const locationRef = useRef()
    const descriptionRef = useRef()


    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Step1" component={Step1} />
                <Stack.Screen name="Step2" component={Step2} />
                <Stack.Screen name="Step3" component={Step3} />
            </Stack.Navigator>
        </View>
    );

    function Step1() {

        const [title, setTitle] = useState('');
        const [location, setLocation] = useState('');

        function onSubmitTitle() {
            global.title = title
            global.location = location

            navigation.navigate('Step2')
        }
        return (
            <View style={{ flex: 1 }}>
                <AppHeader
                    title="Post A Job"
                />
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', alignItems: 'center' }}>
                    <Text style={styles.stepText}>Step 1/3</Text>
                    <Text style={styles.stepTitle}>Please fill in the job information below</Text>
                    <View style={{ width: '100%', paddingHorizontal: 40 }} >

                        <CustomTextInput
                            title="Job Title"
                            max={100}
                            blurOnSubmit={false}
                            returnKeyType={"next"}
                            isValid={title.length > 0}
                            value={title}
                            onSubmitEditing={() => locationRef.current.focus()}
                            ref={titleRef}
                            onChangeText={setTitle}
                            placeholder="-"
                        />

                        <CustomTextInput
                            title="Job Location"
                            containerStyle={{ marginTop: 40 }}
                            returnKeyType={"next"}
                            isValid={location.length > 0}
                            max={100}
                            ref={locationRef}
                            value={location}
                            onSubmitEditing={() => { }}
                            onChangeText={setLocation}
                            placeholder="-"
                        />

                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Button title={"Job Description"} onPress={onSubmitTitle}
                            disabled={!title.length > 0 || !location.length > 0}
                            image={require('../assets/icons/forw_arrow.png')}
                            style={{ marginVertical: 40 }} />
                    </View>
                </ScrollView >
            </View>

        )
    }


    function Step2() {
        const [description, setDescription] = useState('');
        function onSubmitDesc() {
            global.description = description
            navigation.navigate('Step3')
        }

        return (
            <View style={{ flex: 1 }}>
                <AppHeader title="Post A Job" />
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', alignItems: 'center' }}>
                    <Text style={styles.stepText}>Step 2/3</Text>
                    <Text style={styles.stepTitle}>Please fill in the job description below</Text>
                    <View style={{ width: '100%', paddingHorizontal: 40, flex: 9 }} >

                        <CustomTextInput
                            title="Job Description"
                            max={100}
                            returnKeyType={"next"}
                            isValid={description.length > 0}
                            value={description}
                            onSubmitEditing={() => { }}
                            multiline={true}
                            ref={descriptionRef}
                            onChangeText={setDescription}
                            placeholder="-"
                        />

                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Button title={"Job Type"} onPress={onSubmitDesc}
                            disabled={!description.length > 0}
                            image={require('../assets/icons/forw_arrow.png')}
                            style={{ marginVertical: 40 }} />
                    </View>
                </ScrollView >
            </View>

        )
    }

    function Step3() {

        const [selCat, setSelCat] = useState(-1);
        const [subCat, setSubCat] = useState(-1)
        const [pickerModal, showPickerModal] = useState(false);
        const [subCategoryModal, showSubCategoryModal] = useState(false);
        const [jobPostedModal, showJobPostedModal] = useState(false);

        function onSubmitType() {
            Api.postJob(global.userEmail, global.title, global.location, global.description, mainCategories[selCat]).then(res => {
                setTimeout(() => {
                    showJobPostedModal(true)
                }, 1000);
                console.log(res)
            })
        }

        function onJobPosted() {
            navigation.reset({
                index: 1,
                routes: [{ name: 'PostJob' }],
            })
        }

        const categories = [
            {
                name: "Construction", values: [
                    { name: "Brick Laying", isChecked: false },
                    { name: "Electricians", isChecked: false },
                    { name: "Ground Workers", isChecked: false },
                    { name: "Plastering", isChecked: false },
                ]
            },
            {
                name: "Mechanics", values: [
                    { name: "Car", isChecked: false },
                    { name: "Motorcycle", isChecked: false },
                    { name: "Other services", isChecked: false },
                ]
            },
            {
                name: "Farming", values: [
                    { name: "Labouring", isChecked: false },
                    { name: "Other services", isChecked: false },
                ]
            },
            {
                name: "Cleaning", values: [
                    { name: "Indoor", isChecked: false },
                    { name: "Outdoor", isChecked: false },
                ]
            },
            {
                name: "Gardening", values: [
                    { name: "Domestic", isChecked: false },
                    { name: "Commercial", isChecked: false },
                ]
            },
            {
                name: "Painting", values: [
                    { name: "Indoor", isChecked: false },
                    { name: "Outdoor", isChecked: false },
                ]
            },
        ]


        let mainCategories = [
            "Electrician",
            "Alarms and security",
            "Heating and Plumbing",
            "Carpentry and joinery",
            "Block laying",
            "Tiling",
            "Motor Mechanic",
            "Landscaping and gardening",
            "Painting and decorating",
            "Person training / fitness",
            "Construction",
            "Plastering",
            "Insulation"
        ]


        return (
            <View style={{ flex: 1 }}>
                <AppHeader title="Post A Job" />
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white', alignItems: 'center' }}>
                    <Text style={styles.stepText}>Step 3/3</Text>
                    <Text style={styles.stepTitle}>Please fill in the job description below</Text>
                    <View style={{ width: '100%', paddingHorizontal: 40, flex: 9 }} >
                        <View>
                            <CustomTextInput
                                title="Job Category"
                                editable={false}
                                textStyle={{ color: '#273940' }}
                                value={selCat != -1 ? categories[selCat].name : ""}
                                onPress={() => showPickerModal(true)}
                                placeholder="Select A Category"
                            />
                            <Image
                                style={{ height: 20, width: 20, resizeMode: 'contain', position: 'absolute', right: 0, bottom: 25 }}
                                source={require('../assets/icons/down.png')}
                            />
                        </View>

                    </View>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Button title={"Post Job Advert"} onPress={onSubmitType}
                            disabled={selCat == -1}
                            image={require('../assets/icons/forw_arrow.png')}
                            style={{ marginVertical: 40 }} />
                    </View>

                    <ReactNativeModal isVisible={pickerModal}
                        backdropColor={"#fff"}
                        animationIn={'fadeIn'}
                        animationOut={'fadeOut'}
                        onBackButtonPress={() => showPickerModal(false)}
                        useNativeDriver={true}
                    >
                        <View style={{
                            width: '90%', marginVertical: 100, alignSelf: 'center', paddingVertical: 20,
                            backgroundColor: 'white', elevation: 4
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center', color: '#00b5bf', marginBottom: 10 }}>Select Category</Text>
                            <FlatList
                                data={mainCategories}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => { setSelCat(index); showPickerModal(false) }} style={{ marginHorizontal: 20, marginVertical: 10, width: '100%' }}>
                                            <Text style={{ fontSize: 20, color: '#273940' }}>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                    </ReactNativeModal>


                    <ReactNativeModal isVisible={jobPostedModal}
                        backdropColor={"#dfe1e3"}
                        animationIn={'fadeIn'}
                        animationOut={'fadeOut'}
                        onBackButtonPress={onJobPosted}
                        onBackdropPress={onJobPosted}
                        useNativeDriver={true}
                    >
                        <View style={{
                            width: '90%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, borderRadius: 8,
                            backgroundColor: 'white', elevation: 4, borderColor: colors.default, borderWidth: 2
                        }}>
                            <Image style={{ height: 100, resizeMode: 'contain' }} source={require('../assets/icons/tick_circle.png')} />
                            <Text style={{ fontFamily: fonts.medium, fontSize: 18, color: colors.default, marginTop: 20 }}>Job Posted</Text>
                        </View>
                    </ReactNativeModal>


                </ScrollView >
            </View>

        )
    }

}