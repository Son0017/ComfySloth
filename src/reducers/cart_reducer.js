import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

function toggleCartItem(id, y, myArray) {
  let x = [];
  for (let index = 0; index < myArray.length; index++) {
    if (myArray[index].id === id) {
      x.push({ ...myArray[index], amount: y });
    } else {
      x.push(myArray[index]);
    }
  }
  return x;
}
function removeItem(id, myArray) {
  let x = [];
  for (let index = 0; index < myArray.length; index++) {
    if (myArray[index].id !== id) {
      x.push(myArray[index]);
    }
  }
  return x;
}
function totalItems(myArray) {
  let x = 0;
  for (let index = 0; index < myArray.length; index++) {
    x += myArray[index].price * myArray[index].amount;
  }
  return x;
}

function addItem(item, myArray) {
  let x = [];
  let y = 1;
  if (myArray.length === 0) {
    x.push(item);
  } else {
    console.log(1);
    myArray.forEach((element, i) => {
      if (element.id === item.id) {
        x.push({ ...element, amount: element.amount + item.amount });
        y = 0;
        console.log(2);
      } else if (myArray.length - 1 === i && y === 1) {
        x.push(element);
        x.push(item);
        console.log(3);
      } else {
        console.log(4);
        x.push(element);
      }
    });
  }

  return x;
}

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cardItems: addItem(action.payload, state.cardItems),
      };
    case CLEAR_CART:
      return { ...state, cardItems: [] };
    case TOGGLE_CART_ITEM_AMOUNT:
      return {
        ...state,
        cardItems: toggleCartItem(
          action.payload.id,
          action.payload.item,
          state.cardItems
        ),
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cardItems: removeItem(action.payload, state.cardItems),
      };
    case COUNT_CART_TOTALS:
      return {
        ...state,
        total: totalItems(state.cardItems),
      };
    default:
      return { ...state };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
