// import { List } from 'immutable';
import { ADD, DELETE, COMPLETED } from '../actions/todo';
import { SHOW_TYPE_COMPLETED, SHOW_TYPE_ALL } from '../common/Constants';

const generatorData = () => {
  let result = []
  for (let index = 0; index < 100; index++) {
      result = [...result, {
          text: 'aa',
      }]
  }
  return result;
}

const init_items =  generatorData();

export default (items = init_items, action) => {
  let newState = items;
  const { type } = action;
  switch (type) {
    case ADD:
      newState = items.push({
        text: action.text,
        type: SHOW_TYPE_ALL,
      });
      break;
    case DELETE:
      newState = items.delete(action.index);
      break;
    case COMPLETED:
      {
        const { index, isSelected } = action;
        const { text } = items.get(index);
        newState = items.set(index, {
          text,
          type: isSelected ? SHOW_TYPE_COMPLETED : SHOW_TYPE_ALL,
        });
      }
      break;
    default:
      newState = items;
      return items;
  }
  return newState;
};
