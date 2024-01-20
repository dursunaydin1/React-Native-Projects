// PaymentScreen.js

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const PaymentScreen = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const handlePayment = () => {
    // Burada ödeme işlemleri gerçekleştirilebilir
    // Örneğin, bir API'ye ödeme bilgilerini gönderme, işlemin sonucunu kontrol etme vb.

    // Ödeme işlemi başarılı olduğunda kullanıcıyı başka bir ekrana yönlendirme
    navigation.navigate("PaymentSuccessScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ödeme Bilgileri</Text>
      <TextInput
        style={styles.input}
        placeholder="Kart Numarası"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Son Kullanma Tarihi"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />
      <TextInput
        style={styles.input}
        placeholder="CVC"
        value={cvc}
        onChangeText={setCvc}
      />
      <Button title="Ödemeyi Tamamla" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default PaymentScreen;
