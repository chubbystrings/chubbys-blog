import instance from '../admin-auth';

export default {
  getAll: () => instance.get('/articles'),
  getArticle: (id) => instance.get(`/articles/${id}`),
  deleteArticle: (config, id) => instance.delete(`articles/${id}`, config),
  updateArticle: (config, id, postData) => instance.patch(`articles/${id}`, postData, config),
  deleteMany: (config, ids) => instance.delete(`/articles/deletemany/${ids}`, config),
};
