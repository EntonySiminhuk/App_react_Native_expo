import { useState } from "react";
import { StatusBar,
    Text, 
    View , 
    Modal,
    Alert,
    ScrollView, 
    TouchableOpacity, 
} from "react-native";
import { FontAwesome} from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"

import { Header } from "@/components/header";
import { Credential } from "@/components/credential";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { QRcode } from "@/components/qrcode";


export default function(){
    const [image, setImage] = useState("")
    const [expandQRCode, setExpandQRCode] = useState(false)

    async function handleSelectImage(){
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4,4],
            })

            if(result.assets){
                setImage(result.assets[0].uri)
            }
        }catch (erro){
            console.log(erro)
            Alert.alert("Foto", "Não foi possivel selecionar a imagem")
        }
    } 
    return(
        <View className="flex-1 bg-green-500">
            <StatusBar barStyle="light-content"/>
            <Header title="Minha Credencial"/>
            <ScrollView className="-mt-28 -z-10" contentContainerClassName="px-8 pb-8"
            showsVerticalScrollIndicator={false}>

            <Credential 
            image={image} 
            onChangeAvatar={handleSelectImage}
            onExpandQRCode={() => setExpandQRCode(true)}/>

            <FontAwesome 
            name="angle-double-down" 
            size={24} 
            color={colors.gray[300]}
            className="self-center my-6"
            />

            <Text className="text-white font-bold text-2xl mt-4">
                Compatilhar credencial
            </Text>

            <Text className="text-white font-regular text-base mt-1 mb-6">
                Mostre ao mundo que você vai participar do Unite Summit!
            </Text>

            <Button title="Compatilhar"/>

            <TouchableOpacity 
            activeOpacity={0.7} 
            className="mt-10">
                <Text className="text-base text-white font-bold text-center">Remover Ingresso</Text>
            </TouchableOpacity>
            </ScrollView>

            <Modal visible={expandQRCode} statusBarTranslucent>
                <View className="flex-1 bg-green-500 items-center justify-center">
                    <TouchableOpacity 
                    activeOpacity={0.7} 
                    onPress={() => setExpandQRCode(false)}
                    >
                        <QRcode value="teste" size={300} />
                        <Text className="text-body text-orange-500 text-sm text-center mt-10">
                            Fechar QRCode
                        </Text>
                    </TouchableOpacity>

                </View>
            </Modal>
        </View>
    )
}