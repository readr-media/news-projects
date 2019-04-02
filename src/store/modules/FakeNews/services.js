import axios from 'axios'

export const fetchCommentAmount = (id) => axios.get(`/project-api/fake-news/comment/${id}`)

export const updateCommentAmount = ({ id, amount }) => axios.put(`/project-api/fake-news/comment/${id}`, { amount })