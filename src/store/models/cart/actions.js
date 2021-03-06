export function addToCartRequest(id) {
  return {
    type: '@cart/ADD_REQUEST',
    id,
  };
}

export function addToCartSucess(product) {
  return {
    type: '@cart/ADD_SUCESS',
    product,
  };
}

export function removeFromCart(id) {
  return { type: '@cart/REMOVE', id };
}

export function updateAmountRequest(id, ammount) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    ammount,
  };
}

export function updateAmountSucess(id, ammount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCESS',
    id,
    ammount,
  };
}
