const mongoose = require('mongoose');
const Campaign = require('../models/Campaign');
const Product = require('../models/Product');


exports.createCampaign = async (req, res) => {
    const campaign = await (new Campaign(req.body)).save();
    res.send(campaign);
};

exports.getCampaigns = async (req, res) => {
    const query = (req.params.id) ? { _id: req.params.id, } : {};
    const campaignsPromise = Campaign.find(query, {
        low: 0,
        createdAt: 0,
        updatedAt: 0
    })
        .where({ low: null });
    const countPromise = Campaign.count();

    const [campaigns, count] = await Promise.all([campaignsPromise, countPromise]);
    console.log('campaigns', campaigns);
    console.log('count', count);
    const result = {
        campaigns,
        count
    }
    res.send(result);
};

exports.updateCampaign = async (req, res) => {
    console.log('*/*/*/*/*/*');
    console.log(req.params.id);
    const campaign = await Campaign.findOneAndupdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    }).exec();
    console.log('campaign', campaign);
    res.send(campaign);
};

exports.deleteCampaign = async (req, res) => {
    const campaign = await Campaign.findOneAndUpdate({ _id: req.params.id }, { low: Date.now() }).exec();
    res.send(true);
};