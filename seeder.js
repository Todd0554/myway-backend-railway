import dotenv from 'dotenv'
import colors from 'colors'
// mongoose model frame
import User from './models/userModel.js'
import Blog from './models/blogModel.js'

import Site from './models/siteModel.js'
// sample data of users and sites
import sites from './data/sites.js'
import users from './data/users.js'
// mongoDB Atlas connection
import connectDB from './config/db.js'

dotenv.config()
connectDB()

// import sample data
const importData = async () => {
    try {
        // clear the data in database
        await User.deleteMany()
        await Blog.deleteMany()
        await Site.deleteMany()
        

        // insert the example users
        const createdUsers = await User.insertMany(users)

        // get admin user id and add each site a owner(admin user)
        const adminUser = createdUsers[0]._id
        
        // set the user for each sample site
        const sampleSites = sites.map(site => {
            return {...site, user: adminUser}
        })
        // insert the example sites
        await Site.insertMany(sampleSites)

        console.log('successfully adding example data of users and site!'.yellow.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error.message}`.red.bold.inverse)
        process.exit(1)
    }
}

// delete all the data
const destroyData = async () => {
    try {
        // clear the data in database
        await User.deleteMany()
        await Blog.deleteMany()
        
        await Site.deleteMany()
        
        console.log('successfully destroying example data of users and site!'.yellow.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error.message}`.red.bold.inverse)
        process.exit(1)
    }
}

// option of different script (for more script, please go to package.json in root path)
process.argv[2] === '-d' ? destroyData() : importData()
