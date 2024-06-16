import { internalSeverError } from "../middleware/handle_errors";
import * as services from "../services";
// import { email, password, mobile, address, name } from "../helper/joi_chema";
// import joi from "joi";
export const getCurrent = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.getOne(id);
    return res.status(200).json(response);
  } catch (error) {
    return internalSeverError(res);
  }
};

// tất cả User
export const getAlluser = async (req, res) => {
  try {
    const PAGE_SIZE = 4; // Số lượng sản phẩm trên mỗi trang
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * PAGE_SIZE;

    const response = await services.getAlluser({ skip, limit: PAGE_SIZE });
    return res.status(200).json(response);
  } catch (error) {
    return internalSeverError(res);
  }
};

//
// tất cả User
export const dellUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.delUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return internalSeverError(res);
  }
};
//
export const updateUserController = async (req, res) => {
  try {
    console.log(req.user);
    console.log("Request body:", req.body); // Log toàn bộ `req.body`

    const { id } = req.body; // Truy cập `id` từ `req.body`
    console.log("ID received from body:", id);

    if (!id) {
      return res.status(400).json({ err: 1, mess: "ID is missing" });
    }

    const response = await services.updateUser(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in updateUser controller:", error);
    return res.status(500).json({ err: 1, mess: "Internal Server Error" });
  }
};
