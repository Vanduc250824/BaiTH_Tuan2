import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { getPopularMovies } from "../Api"; // Import API

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getPopularMovies("Batman"); // Lấy phim theo từ khóa
      setMovies(data);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="red" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movieItem}
            onPress={() => navigation.navigate("Profile", { movieId: item.imdbID })}
          >
            <Image source={{ uri: item.Poster }} style={styles.image} />
            <Text style={styles.title}>{item.Title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  movieItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: "#ccc" 
  },
  image: { 
    width: 60, 
    height: 90, 
    borderRadius: 5, 
    marginRight: 10 
  },
  title: { 
    fontSize: 16, 
    fontWeight: "bold", 
    flexShrink: 1 
  },
  arrow: { 
    marginLeft: "auto", 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#555" 
  },
});

export default HomeScreen;
