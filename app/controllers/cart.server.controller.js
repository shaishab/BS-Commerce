'use strict';

var cartService = require('../services/cart.server.service');

exports.addToCart = function(req, res) {
    cartService.addToCart(req.user._id, req.body.item)
        .then(function(cart){
            return res.status(200).json(cart);
        })
        .catch(function(error){
            return res.status(400).json({msg: 'Error occurred while add item to cart', error: error});
        })
        .done();
};

exports.getCart = function(req, res) {
    if(!req.user) {
        return res.status(200).json('');
    }
    cartService.getCart(req.user._id)
        .then(function(cart){
            return res.status(200).json(cart);
        })
        .catch(function(error){
            return res.status(400).json({msg: 'Error occurred while getting cart', error: error});
        })
        .done();
};

exports.deleteCartById = function(req, res){
  cartService.deleteCartById(req.query.cartId)
      .then(function(cart){
          return res.status(200).json(cart);
      })
      .catch(function(error){
          return res.status(400).json({msg: 'Error occurred while deleting cart', error: error});
      })
      .done();
};


exports.updateCartItem = function(req, res){
    cartService.updateCartItem(req.user._id, req.body.item)
        .then(function(cart){
            return res.status(200).json(cart);
        })
        .catch(function(error){
            return res.status(400).json({msg: 'Error occurred while updating cart item', error: error});
        })
        .done();
};

exports.deleteCartItem = function(req, res){
    cartService.deleteCartItem(req.user._id, req.body.item)
        .then(function(cart){
            return res.status(200).json(cart);
        })
        .catch(function(error){
            return res.status(400).json({msg: 'Error occurred while deleting cart item', error: error});
        })
        .done();
};
