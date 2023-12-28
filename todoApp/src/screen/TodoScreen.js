import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import Fallback from "../components/Fallback";

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  // Input değiştiğinde tetiklenecek fonksiyon
  const handleInputChange = (userText) => {
    setTodo(userText);
  };

  // "Add" butonunu aktif/pasif hale getiren fonksiyon
  const isAddButtonDisabled = () => {
    return todo.trim() === ""; // Eğer input boşsa true döner, yani buton pasif olur
  };

  const handleAddTodo = () => {
    if (isAddButtonDisabled()) {
      return; // Boşsa eklemeyi engelle
    }

    const newTodo = { id: Date.now().toString(), title: todo };
    setTodoList([...todoList, newTodo]);
    setTodo("");
  };

  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);
  };

  const handleEditTodo = (todo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === editedTodo.id) {
        return { ...item, title: todo };
      }
      return item;
    });
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo("");
  };

  const renderTodos = ({ item, index }) => {
    return (
      <View style={styles.todoContainer}>
        <Text style={styles.todoText}>{item.title}</Text>
        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => handleEditTodo(item)}
        />
        <IconButton
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleDeleteTodo(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={todo}
        style={styles.input}
        onChangeText={handleInputChange}
        placeholder="Add a task"
      />

      {editedTodo ? (
        <TouchableOpacity onPress={handleUpdateTodo} style={styles.button}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleAddTodo}
          style={[
            styles.button,
            isAddButtonDisabled() && styles.disabledButton,
          ]}
          disabled={isAddButtonDisabled()} // Butonun pasif olması için disabled prop
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={todoList}
        renderItem={renderTodos}
        keyExtractor={(item) => item.id}
      />

      {todoList.length <= 0 && <Fallback />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    top: 24,
  },
  input: {
    borderWidth: 2,
    borderColor: "#1e90ff",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 34,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  disabledButton: {
    backgroundColor: "#888", // Pasif durumu için farklı bir renk veya stillendirme
  },
  todoContainer: {
    backgroundColor: "#1e90ff",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  todoText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    flex: 1,
  },
});

export default TodoScreen;
