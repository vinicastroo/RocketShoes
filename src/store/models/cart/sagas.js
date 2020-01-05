import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';
import { formatPrice } from '../../../util/format';

import { addToCartSucess, updateAmountSucess } from './actions';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmmount = stock.data.amount;
  const currrentAmmount = productExists ? productExists.ammount : 0;

  const ammount = currrentAmmount + 1;
  if (ammount > stockAmmount) {
    toast.error('Quantidade solicitada fora do estoque');
    return;
  }
  if (productExists) {
    yield put(updateAmountSucess(id, ammount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      ammount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSucess(data));
    history.push('/cart');
  }
}

function* updateAmount({ id, ammount }) {
  if (ammount <= 0) return;
  const stock = yield call(api.get, `stock/${id}`);
  const stockAmmount = stock.data.amount;

  if (ammount > stockAmmount) {
    toast.error('Quantidade solicitada fora do estoque');
    return;
  }

  yield put(updateAmountSucess(id, ammount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
