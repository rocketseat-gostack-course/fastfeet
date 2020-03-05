import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import states from '../../config/states';

class RecipientController {
  async list(req, res) {
    const data = await Recipient.findAll();
    return res.json(data);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(128).required(),
      email: Yup.string(128)
        .email()
        .required(),
      address: Yup.string().required(),
      state: Yup.string(128).required(),
      city: Yup.mixed()
        .required()
        .oneOf(states),
      zipcode: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const {
      id,
      name,
      email,
      address,
      state,
      city,
      zipcode,
    } = await Recipient.create(req.body);
    return res.json({ id, name, email, address, state, city, zipcode });
  }

  async update(req, res) {
    const recipientId = req.params.id;
    if (!recipientId) {
      return res.status(400).json({ error: 'Invalid params.' });
    }

    const schema = Yup.object().shape({
      name: Yup.string(128).required(),
      email: Yup.string(128)
        .email()
        .required(),
      address: Yup.string().required(),
      state: Yup.string(128).required(),
      city: Yup.mixed()
        .required()
        .oneOf(states),
      zipcode: Yup.number()
        .integer()
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const recipient = await Recipient.findOne({ where: { id: recipientId } });

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exists.' });
    }

    const {
      id,
      name,
      email,
      address,
      state,
      city,
      zipcode,
    } = await recipient.update(req.body);

    return res.json({ id, name, email, address, state, city, zipcode });
  }
}

export default new RecipientController();
