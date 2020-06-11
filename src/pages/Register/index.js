import React, { useEffect, useState } from 'react';
import {View, Text, Alert} from 'react-native';
import { LoginTemplate } from '../../template';
import { LoginInput, ActionButton, PasswordInput  } from '../../component/atoms';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';

const Register = ({navigation}) => {
    const [form, setForm] = useState({
        nama: '',
        email:'',
        password:'',
    });
    const onInputChange = (value, input) => {
        setForm({
            ...form,
            [input]: value,
        })
    }
    const sendData = screen => {
        if (form.nama==='') {
            Alert.alert("Nama tidak boleh kosong")
        }
        if (form.email==='') {
            Alert.alert("Email tidak boleh kosong")
        }
        if (form.password==='') {
            Alert.alert("Password tidak boleh kosong")
        }
        if (form.password!=='' && form.email!=='') {
        fetch(`http://117.53.47.76/kms_backend/public/api/petani/register`,
        {
            method:"POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then((response) => response.json())
        .then(async (data)=> {
            try {
                const value = JSON.stringify(data.access_token)
                await AsyncStorage.setItem('userToken', value)
                console.log(data)
                navigation.replace(screen)
            } catch (err) {
                console.log('AsyncStorage Error: ' + error.message);
            }
        })
    }
    };
    const handleGoTo = screen => {
        navigation.replace(screen);
    };
    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View>
                <LoginTemplate/>
                <LoginInput placeholder="Nama                                   " icon="person"
                    value={form.fullName}
                    onChangeText={value=>onInputChange(value, 'nama')}
                />
                <LoginInput placeholder="Email                                  " icon="email"
                    value={form.email}
                    onChangeText={value=>onInputChange(value, 'email')}
                />
                <PasswordInput placeholder="Password                                  " icon="lock"
                    value={form.password}
                    onChangeText={value=>onInputChange(value, 'password')}
                />
            </View>
            <ActionButton title="Daftar" onPress={() => sendData('KMS Sawit')}/>
            <View style={styles.wrapper}>
                <Text>Sudah memiliki akun?</Text>
                <Text style={styles.textbutton} onPress={() => handleGoTo('Login')}> Masuk</Text>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = {
    wrapper : {
        marginTop: 30,
        flexDirection:"row",
        justifyContent: 'center'
    },
    textbutton : {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 20
    }
}
export default Register;