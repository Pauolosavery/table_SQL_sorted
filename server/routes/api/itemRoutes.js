/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
const { Op } = require('sequelize');
const itemRoutes = require('express').Router();
const { Item } = require('../../db/models');

itemRoutes
  .route('/')
  .get(async (req, res) => {
    const { sorted, sortedOption, page } = req.query;
    let { inputOption } = req.query;
    try {
      if (sorted && inputOption && sortedOption) {
        if (sorted !== 'title') inputOption = Number(inputOption);
        if (inputOption) {
          const itemsF = await Item.findAll({
            raw: true,
            where: {
              [`${sorted}`]: {
                [Op[`${sortedOption}`]]: inputOption,
              },
            },
          });
          const items = itemsF.splice((page * 2) - 2, 2);
          const pageCount = Math.ceil(itemsF.length / 3);
          res.status(200).json({ items, pageCount });
        }
      } else {
        const itemsF = await Item.findAll({
          raw: true,
        });
        const items = itemsF.splice((page * 2) - 2, 2);
        const pageCount = Math.ceil(itemsF.length / 3);
        res.status(200).json({ items, pageCount });
      }
    } catch (err) {
      res.status(500).json({ errorMessage: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const {
        date, title, amount, distance,
      } = req.body;
      await Item.create({
        date, title, amount, distance,
      });
      const messageCompletedSuccessfully = 'Событие успешно добавлено в список.';
      res.status(200).json({ messageCompletedSuccessfully });
    } catch (err) {
      res.status(500).json({ errorMessage: err.message });
    }
  })
  .put(async (req, res) => {
    try {
      const {
        id, date, title, amount, distance,
      } = req.body;
      await Item.update({
        date, title, amount, distance,
      }, {
        where: { id },
      });
      const messageCompletedSuccessfully = 'Данные события успешно изменёны';
      res.status(200).json({ messageCompletedSuccessfully });
    } catch (err) {
      res.status(500).json({ errorMessage: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const {
        id,
      } = req.body;
      const delItem = await Item.findOne({
        where: { id },
      });
      await delItem.destroy();
      const messageCompletedSuccessfully = `События ${delItem.title} больше нет в списке`;
      res.status(200).json({ messageCompletedSuccessfully });
    } catch (err) {
      res.status(500).json({ errorMessage: err.message });
    }
  });
module.exports = itemRoutes;
