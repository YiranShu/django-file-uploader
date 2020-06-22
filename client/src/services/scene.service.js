import http from "../http-common";

class SceneDataService {
  getAll() {
    return http.get("/scenes");
  }

  get(_id) {
    return http.get(`/scenes/${_id}/`);
  }

  create(data) {
    return http.post("/scenes/", data);
  }

  update(_id, data) {
    return http.put(`/scenes/${_id}/`, data);
  }

  delete(_id) {
    return http.delete(`/scenes/${_id}/`);
  }

  deleteAll() {
    return http.delete(`/scenes`);
  }

  findByName(scene_name) {
    console.log('reached scene service')
    return http.get(`/scenes/search/${scene_name}/`);
  }
}

export default new SceneDataService();