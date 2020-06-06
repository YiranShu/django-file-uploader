import http from "../http-common";

class SceneDataService {
  getAll() {
    return http.get("/scenes");
  }

  get(file_name) {
    return http.get(`/scenes/${file_name}`);
  }

  create(data) {
    return http.post("/scenes/", data);
  }

  update(file_name, data) {
    return http.put(`/scenes/${file_name}`, data);
  }

  delete(file_name) {
    return http.delete(`/scenes/${file_name}`);
  }

  deleteAll() {
    return http.delete(`/scenes`);
  }

  findByName(name) {
    return http.get(`/scenes?name=${name}`);
  }
}

export default new SceneDataService();