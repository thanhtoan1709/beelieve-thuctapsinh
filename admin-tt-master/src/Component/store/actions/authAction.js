import { apiLogginSuccess, apiloginSubmit } from '../../api/authServices';
import actionTypes from './actionType';

export const loginSuccess = (id) => async (dispath) => {
  try {
    const response = await apiLogginSuccess(id);
    if (response?.data.err === 0) {
      dispath({
        type: actionTypes.LOGIN_SUCESS,
        data: response?.data.token,
      });
    } else {
      dispath({
        type: actionTypes.LOGIN_SUCESS,
        data: null,
      });
    }
  } catch (error) {
    dispath({
      type: actionTypes.LOGIN_SUCESS,
      data: null,
    });
  }
};
export const loginSubmit = (email, password) => async (dispatch) => {
  try {
    const response = await apiloginSubmit(email, password);

    if (response?.data.err === 0) {
      // Nếu đăng nhập thành công, dispatch action LOGIN_SUBMIT để cập nhật trạng thái trong Redux store
      dispatch({
        type: actionTypes.LOGIN_SUBMIT,
        data: response?.data.token,
      });
    } else {
      // Đăng nhập thất bại, có thể xử lý thông báo lỗi ở đây
      console.error('Đăng nhập không thành công');
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error('Đã xảy ra lỗi khi gọi API đăng nhập:', error);
  }
};
export const logOut = () => ({
  type: actionTypes.LOGOUT,
});
