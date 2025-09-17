const Payments = require('../../api/v1/payments/model');
const { checkingImage } = require('./images');

const { NotFoundError, BadRequestError } = require('../../errors');

const getAllPayments = async (req) => {
    let condition = { organizer: req.user.organizer };

    const payments = await Payments.find(condition)
        .populate({
            path: 'image',
            select: '_id urlImg'
        })
        .select('_id type status image');
    return payments;
};

const getOnePayment = async (req) => {
    const { id } = req.params;
    const organizer = req.user.organizer;
    const payment = await Payments.findOne({ organizer, _id: id }).populate({
        path: 'image',
        select: '_id urlImg'
    }).select('_id type status image');

    if (!payment) throw new NotFoundError(`Tidak ada tipe pembayaran dengan id :  ${id}`);

    return payment;
}

const createPayment = async (req) => {
    const { type, image } = req.body;
    const organizer = req.user.organizer;

    await checkingImage(image);

    const check = await Payments.findOne({ type,  organizer});

    if (check) throw new BadRequestError('Tipe pembayaran duplikat'); 

    const create = await Payments.create({
        type,
        image,
        organizer,
    });

    return create;
}

const updatePayment = async (req) => {
    const { id } = req.params;
    const { type, image } = req.body;
    const organizer = req.user.organizer;

    await checkingImage(image);

    const check = await Payments.findOne({ 
        organizer, _id: { $ne: id },
    });

    if (check) throw new BadRequestError('Tipe pembayaran duplikat');

    const update = await Payments.findOneAndUpdate(
        { _id: id },
        { type, image, organizer: req.user.organizer },
        { new: true, runValidators: true }
    );

    if (!update) throw new NotFoundError(`Tidak ada tipe pembayaran dengan id :  ${id}`);

    return update;
}

const deletePayment = async (req) => {
    const { id } = req.params;

    const result = await Payments.findOneAndDelete({
        _id: id,
        organizer: req.user.organizer,
    });

    if (!result) {
        throw new NotFoundError(`Tidak ada tipe pembayaran dengan id : ${id}`);
    }

    return result;
};

const checkingPayment = async (id) => {
  const result = await Payments.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`Tidak ada tipe pembayaran dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllPayments,
  createPayment,
  getOnePayment,
  updatePayment,
  deletePayment,
  checkingPayment,
};