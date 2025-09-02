import instance from "../libs/axios/instance";

const noteServices = {
  findAll: () => instance.get('/notes'),
  create: (payload) => instance.post('/notes', payload),
  delete: (id) => instance.delete(`/notes/${id}`),
}

export default noteServices
