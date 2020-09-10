const slugify = require('slugify')
const Category = require('../models/category')
const {errorHandler} = require('../helpers/dbErrorHandler')


exports.create = (req, res) => {
    const {name} = req.body
    const slug = slugify(name).toLowerCase()

    let category = new Category({name, slug})

    category.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.json(data)
    })
}

exports.list = (req, res) => {
    Category.find({}).exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })
}

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase()

    Category.findOne({slug}).exec((err, category) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(category)
    })
}

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase()

    Category.findOneAndRemove({slug}).exec((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({
            message: 'deleted category'
        })
    })
}