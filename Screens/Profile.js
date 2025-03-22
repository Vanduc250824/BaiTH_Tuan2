import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { getMovieDetails } from "../Api"; // Import API

const ProfileScreen = ({ route }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        console.log("Dữ liệu nhận được:", data);
        setMovie(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <ActivityIndicator size="large" color="red" style={styles.loading} />;
  }

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Không tìm thấy dữ liệu phim!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hàng ngang chứa ảnh bên trái và thông tin bên phải */}
      <View style={styles.row}>
        <Image source={{ uri: movie.Poster }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.Title}</Text>
          <Text style={styles.description}>{movie.Plot}</Text>
        </View>
      </View>

      {/* Dòng thông tin bên dưới ảnh */}
      <View style={styles.details}>
        <Text style={styles.info}>🗓 Năm: {movie.Year}</Text>
        <Text style={styles.info}>⭐ IMDb: {movie.imdbRating}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: "#fff" },

  loading: { flex: 1, justifyContent: "center", alignItems: "center" },

  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  row: {
    flexDirection: "row", // Hiển thị theo hàng ngang
    alignItems: "center",
    marginBottom: 15,
  },

  image: {
    width: 160, // Giữ kích thước ảnh nhỏ hơn để vừa với bố cục
    height: 240,
    borderRadius: 10,
  },

  infoContainer: {
    flex: 1, // Phần chứa tiêu đề và mô tả mở rộng hết phần còn lại
    marginLeft: 15, // Cách ảnh một khoảng nhỏ
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },

  description: {
    fontSize: 14,
    color: "#333",
  },

  details: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  info: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 5,
  },

  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default ProfileScreen;
