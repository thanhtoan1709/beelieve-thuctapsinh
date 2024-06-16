import db from "../models";
import cloudinary from "cloudinary";

export const createNewOutfit = async (body, fileData) => {
  try {
    const {
      outfitName,
      topProductName,
      bottomProductName,
      priceOProduct,
      goWhere,
      styleFilter,
      eventFilter,
      descriptionOProduct,
    } = body;

    // Tìm sản phẩm với tên topProductName và có category 'top'
    const topProduct = await db.Products.findOne({
      where: { id_pr: topProduct, code_cat: "Top" },
    });

    if (!topProduct) {
      return {
        err: 1,
        mess: `Top product with id ${topProduct} not found`,
      };
    }

    // Tìm sản phẩm với tên bottomProductName và có category 'bottom'
    const bottomProduct = await db.Products.findOne({
      where: { id_pr: bottomProductName, code_cat: "Bottom" },
    });

    if (!bottomProduct) {
      return {
        err: 1,
        mess: `Bottom product with id ${bottomProductName} not found`,
      };
    }

    let imageOProductPath = null;
    if (fileData) {
      // Upload ảnh lên Cloudinary
      const result = await cloudinary.uploader.upload(fileData.path);
      imageOProductPath = result.secure_url;
    }

    // Tạo outfit mới
    const newOutfit = await db.Outfits.create({
      outfitName,
      topProductId: topProduct.id_pr,
      bottomProductId: bottomProduct.id_pr,
      priceOProduct,
      goWhere,
      styleFilter,
      eventFilter,
      imageOProduct: imageOProductPath,
      descriptionOProduct,
    });

    return { err: 0, mess: "Outfit created successfully", outfit: newOutfit };
  } catch (error) {
    console.error("Error in createNewOutfit service:", error);
    if (fileData) cloudinary.uploader.destroy(fileData.filename);
    throw error;
  }
};
