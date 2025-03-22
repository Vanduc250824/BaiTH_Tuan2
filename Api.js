const API_KEY = "3d972278"; // Thay API key của bạn vào đây
const BASE_URL = "http://www.omdbapi.com/";

// Lấy danh sách phim theo từ khóa
export const getPopularMovies = async (searchQuery = "Batman") => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${searchQuery}`);
    const data = await response.json();
    if (data.Response === "True") {
      return data.Search; // Danh sách phim
    } else {
      console.error("Lỗi khi lấy danh sách phim:", data.Error);
      return [];
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phim:", error);
    return [];
  }
};

// Lấy thông tin chi tiết phim theo movieId
export const getMovieDetails = async (movieId) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${movieId}`);
    const data = await response.json();
    if (data.Response === "True") {
      return data;
    } else {
      console.error("Lỗi khi lấy chi tiết phim:", data.Error);
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết phim:", error);
    return null;
  }
};
