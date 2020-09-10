const slugify = require('slugify')
const Tag = require('../models/tag')
const {errorHandler} = require('../helpers/dbErrorHandler')


exports.create = (req, res) => {
    const {name} = req.body
    const slug = slugify(name).toLowerCase()

    let tag = new Tag({name, slug})

    tag.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        return res.json(data)
    })
}

exports.list = (req, res) => {
    Tag.find({}).exec((err, data) => {
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

    Tag.findOne({slug}).exec((err, tag) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(tag)
    })
}

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase()

    Tag.findOneAndRemove({slug}).exec((err, data) => {
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