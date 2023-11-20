'use strict';

const express = require('express');
const { ItemModel } = require('../models/item');

const router = express.Router();

router.get('/items', handleGet);
router.post('/items', handlePost);
router.put('/items/:id', handlePut);
router.delete('/items/:id', handleDelete);

async function handleGet(request, response) {
  let records = await ItemModel.read();
  response.status(200).json({ results: records });
}

async function handlePost(request, response) {
  let record = await ItemModel.create(request.body);
  response.status(201).json(record);
}

async function handlePut(request, response) {
  let record = await ItemModel.update(request.params.id, request.body);
  response.status(200).json(record);
}

async function handleDelete(request, response) {
  let result = await ItemModel.delete(request.params.id);
  response.status(200).json({ message: 'Item successfully deleted' });
}

module.exports = router;
