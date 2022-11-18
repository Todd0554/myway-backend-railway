import Site from '../models/siteModel.js'
// asyncHandler is used to simplify the syntax of the promise catch error handling
import asyncHandler from 'express-async-handler'

// show all sites
// GET /api/sites
// Public
export const getSites = asyncHandler(async (req, res) => {
    const sites = await Site.find()
    res.status(200)
    res.json(sites)
})

// show one site
// GET /api/sites/:id
// Public
export const getOneSite = asyncHandler(async (req, res) => {
    const site = await Site.findById(req.params.id)
    if (site){
        res.status(200)
        res.json(site)
    } else {
        res.status(404)
        throw new Error('not found this site!')
    }
})


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// update one site
// POST /api/sites
// only admin
export const createSite = asyncHandler(async (req, res) => {
    const site = new Site({
        user: req.user._id,
        name: "name of the site",
        description: "description of the site",
        rating: 4,
        numComments: 0,
        image: "path of the image",
        category: "category of the site"
    })
    const createdSite = await site.save()
    res.status(201).json(createdSite)
})

// update one site
// PUT /api/sites/:id
// only admin
export const updateSite = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        rating,
        numComments,
        image,
        category,
        lat,
        lng
    } = req.body
    const site = await Site.findById(req.params.id)
    if (site) {
        site.name = name
        site.description = description
        site.rating = rating
        site.numComments = numComments
        site.image = image
        site.category = category
        site.lat = lat
        site.lng = lng
        const updateSite = await site.save()
        res.status(201).json(updateSite)
    } else {
        res.status(404).json('Site not found!')
    }
})

// user profile
// GET /api/users/profile
// only admin
export const deleteSite = asyncHandler(async (req, res) => {
    const site = await Site.findById(req.params.id)
    if (site) {
        await site.remove()
        res.status(200).json({message: 'Site removed successfully!'})
    } else {
        res.status(404)
        throw new Error('not found this site!')
    }
})

// create comment for site
// POST /api/sites/:id/comments
// users
export const createSiteComment = asyncHandler(async (req, res) => {
    const {
        content
    } = req.body
    const site = await Site.findById(req.params.id)
    if (site) {
        const createComment = {
            user: req.user._id,
            content,
            name: req.user.name
        }
        site.comments.push(createComment)
        site.numComments = site.comments.length
        await site.save()
        res.status(201).json({message: "Successfully add comment."})
    } else {
        res.status(404).json('Site not found!')
    }
})

// delete comment for blog
// DELETE /api/blogs/:id/comments/:commentId
// users
export const deleteBlogComment = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        const comment = await blog.comments.find(comment => comment._id.toString() === req.params.commentId.toString())
        if (comment) {
            await comment.remove()
            blog.numComments = blog.comments.length
            await blog.save()
            res.status(201).json({message: "Successfully delete comment."})
        }
    } else {
        res.status(404).json('Blog not found!')
    }
})

// delete comment for site
// DELETE /api/blogs/:id/comments/:commentId
// users
export const deleteSiteComment = asyncHandler(async (req, res) => {
    const site = await Site.findById(req.params.id)
    if (site) {
        const comment = await site.comments.find(comment => comment._id.toString() === req.params.commentId.toString())
        if (comment) {
            await comment.remove()
            site.numComments = site.comments.length
            await site.save()
            res.status(201).json({message: "Successfully delete comment."})
        }
    } else {
        res.status(404).json('Site not found!')
    }
})