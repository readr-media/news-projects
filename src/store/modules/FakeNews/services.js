import axios from 'axios'

export const fetchCommentAmount = (id) => axios.get(`/project-api/fake-news/comment/${id}`)

export const updateCommentAmount = ({ id, amount }) => axios.put(`/project-api/fake-news/commentAmount/${id}`, { amount })

export const fetchQuizAmount = (id) => axios.get(`/project-api/fake-news/quiz/${id}`)

export const updateQuizAmount = ({ id, amount }) => axios.put(`/project-api/fake-news/quizAnswerTrue/${id}`, { amount })

export const fetchQuizTotalAmount = (id) => axios.get(`/project-api/fake-news/quizTotal/${id}`)

export const updateQuizTotalAmount = ({ id, amount }) => axios.put(`/project-api/fake-news/quizTotalAmount/${id}`, { amount })
