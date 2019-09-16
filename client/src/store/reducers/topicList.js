const defaultValue = [];
const topicList = (state = defaultValue, action) => {
  switch (action.type) {
    case 'ADD_TOPIC_LIST':
      return [...action.info]
    default:
      return state
  }
}

export default topicList;
