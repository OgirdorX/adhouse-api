const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const campaignController = require('../controllers/campaignController');
const { catchErrors } = require('../handlers/errorHandlers');


// Products routes
router.get('/getProducts', catchErrors(productController.getProducts));
router.get('/editProduct/:id', catchErrors(productController.getProducts));

router.post('/updateProduct/:id', catchErrors(productController.updateProduct));

router.post('/addProduct',
    productController.upload,
    catchErrors(productController.resize),
    catchErrors(productController.createProduct)
);

router.post('/deleteProduct/:id', catchErrors(productController.deleteProduct));

// Campaigns routes
router.get('/getCampaigns', catchErrors(campaignController.getCampaigns));
router.get('/editCampaigns/:id', catchErrors(campaignController.getCampaigns));

router.post('/updateCampaign/:id', catchErrors(campaignController.updateCampaign));

router.post('/addCampaign', catchErrors(campaignController.createCampaign));

router.post('/deleteCampaign/:id', catchErrors(campaignController.deleteCampaign));

module.exports = router;