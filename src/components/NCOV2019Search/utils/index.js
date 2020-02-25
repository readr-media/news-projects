export const createPayload = ({
  query = '',
  from = 0,
  size = 10
}) => ({
  'from': from,
  'size': size,
  'query': {
    'bool': {
      'must': [
        {
          'multi_match': {
            'query': query,
            // 'type': 'phrase',
            'fields': [
              'title^2',
              'content',
              'tags.text'
            ]
          }
        },
        {
          'match': {
            'type': 8 // post type
          }
        }
      ]
    }
  },
  'sort': [
    // '_score',
    {
      'updated_at': {
        'order': 'desc'
      }
    }
  ]
})
