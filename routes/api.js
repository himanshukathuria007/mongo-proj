// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const Profile = require('../models/Profile')

router.get('/profile', (req, res) => {
	let filters = req.query
	if (req.query.age != null){
		filters = {
			age: {$gt: req.query.age}
		}
	}

	Profile.find(filters)
	.then(profiles => {
		res.json({
			confirmation: 'success',
			data: profiles
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

//non restful and also handel by put(front end)
router.get('/profile/update', (req, res) => {
   const query = req.query  //require id, key=value
   const profileId = query.id
  delete query['id']


   Profile.findByIdAndUpdate(profileId, query, {new:true})

	.then(profiles => {
		res.json({
			confirmation: 'success',
			data: profiles
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})


})

router.get('/profile/remove', (req, res) => {
	const query = req.query  
 
	Profile.findByIdAndRemove(query.id)
 
	 .then(data => {
		 res.json({
			 confirmation: 'success',
			 data: 'Profile  '+query.id+' sucessfully removed'
		 })
	 })
	 .catch(err => {
		 res.json({
			 confirmation: 'fail',
			 message: err.message
		 })
	 })
 
 
 })
 


router.get('/profile/:id', (req, res) => {
	const id = req.params.id

	Profile.findById(id)
	.then(profiles => {
		res.json({
			confirmation: 'success',
			data: profiles
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Profile' + id + 'not found.'
		})
	})
})



router.post('/profile', (req, res) => {


	Profile.create(req.body)
	.then(profiles => {
		res.json({
			confirmation: 'success',
			data: req.body
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})



module.exports = router
