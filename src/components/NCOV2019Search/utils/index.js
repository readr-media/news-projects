export const createPayload = ({
  query = '',
  from = 0,
  size = 10
}) => ({
  'from': from,
  'size': size,
  'query': query
})
