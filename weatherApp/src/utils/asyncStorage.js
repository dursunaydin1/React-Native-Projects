import AsyncStorage from "@react-native-async-storage/async-storage";

// Veriyi depolamak için kullanılır.
// @param {string} key - Depolanan verinin anahtarı
// @param {string} value - Depolanacak veri
export const storeData = async (key, value) => {
  try {
    // AsyncStorage.setItem, belirtilen anahtarla bir değeri depolar.
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Hata durumunda bilgiyi konsola yazdırır.
    console.log("Error storing value:", error);
  }
};

// Veriyi almak için kullanılır.
// @param {string} key - Alınacak verinin anahtarı
// @returns {Promise<string | null>} - Belirtilen anahtarla ilişkilendirilmiş değeri içeren bir Promise döndürür.
export const getData = async (key) => {
  try {
    // AsyncStorage.getItem, belirtilen anahtarla ilişkilendirilmiş değeri alır.
    const value = await AsyncStorage.getItem(key);
    return value; // Alınan değeri döndürür.
  } catch (error) {
    // Hata durumunda bilgiyi konsola yazdırır.
    console.log("Error retrieving value", error);
  }
};
