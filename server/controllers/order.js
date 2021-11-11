const fs = require('fs');
const asyncHandler = require('express-async-handler');
const { cloudinary } = require('../utils/cloudinary');

const Order = require('../models/order');


exports.createOrder = asyncHandler(async (req, res) => {
  const { image } = req.files;

  const filePath = `./server/photos/${image.name}`;

  try {
    // write the file to the filepath
    image.mv(filePath, async (err) => {
      if (err) {
        // console.error(err);
        res.status(500);
        throw new Error('Error while uploading image');
      }

      // upload the image to cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(filePath, {
        upload_preset: 'paint_order',
      });

      // remove file from the filepath (synchronously)
      fs.unlinkSync(filePath, (err) => {
        if (err) {
          console.log('Error while deleting file...', err);
        } else {
          console.log('file deleted...');
        }
      });

      // Create new order
      const newOrder = new Order({
        picture: {
          name: uploadedResponse.original_filename,
          url: uploadedResponse.url,
          cloudinary_public_id: uploadedResponse.public_id,
        }
      });
      await newOrder.save();

      res.json({
        success: true,
        data: uploadedResponse
      });
    });
  } catch (error) {
    res.status(500);
    throw new Error('Error while uploading image');
  }
});


exports.removeOrder = asyncHandler(async (req, res) => {
  const { order } = req.body;

  // delete image with this url in cloudinary_public_id
  const { cloudinary_public_id } = order.picture;
  // remove order with this id from DB
  const id = order._id;

  try {
    // delete image from cloudinary
    await cloudinary.uploader.destroy(cloudinary_public_id);

    //  delete order from DB
    const order = await Order.findById(id);
    await order.remove();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log('removeOrder ERROR: ', error);

    res.status(500);
    throw new Error('Error while removing order');
  }
});


exports.getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find() || [];

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.log('getAllOrders ERROR: ', error);

    res.status(500);
    throw new Error('Error while fetching orders');
  }
});