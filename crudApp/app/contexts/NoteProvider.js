//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  Component,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const NoteContext = createContext();

// create a component
const NoteProvider = ({children}) => {
  const [notes, setNotes] = useState([]);

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) setNotes(JSON.parse(result));
  };
  useEffect(() => {
    // AsyncStorage.clear();
    // findGreet();
    findNotes();
  }, []);
  return (
    <NoteContext.Provider value={{notes, setNotes, findNotes}}>
      {children}
    </NoteContext.Provider>
  );
};
export const useNotes = () => useContext(NoteContext);
//make this component available to the app
export default NoteProvider;
