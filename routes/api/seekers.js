const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/keys')
const router = express.Router()

// Load User model
const Seeker = require('../../models/Seeker')

// @route POST api/babies/
// @desc Register user
// @access Public
router.post('/signup', async (req, res) => {
  try {
    const { firstname, lastname, address, email, phone, password } = req.body
    console.log(firstname, lastname)
    let seeker = await Seeker.findOne({ email })
    if (seeker) {
      return res.json({
        success: false,
        message: 'Account already exists!',
      })
    }
    seeker = new Seeker({
      firstname,
      lastname,
      address,
      email,
      phone,
      password,
    })
    const salt = await bcrypt.genSalt(10)
    seeker.password = await bcrypt.hash(password, salt)
    await seeker.save()

    const token = await jwt.sign(seeker.toJSON(), config.secretOrKey, {
      expiresIn: 36000,
    })
    return res.json({
      success: true,
      message: 'The Job Seeker account is created successfully!',
      accessToken:"HS-" + token,
      type:'seeker',
      seeker: {
        id: seeker._id,
        firstname: seeker.firstname,
        lastname: seeker.lastname,
        addresss: seeker.address,
        email: seeker.address,
        phone: seeker.phone,
      },
    })
  } catch (err) {
    console.log(err)
    res.json({
      success: false,
      message: 'Internal Server Error',
      error: err
    })
  }
})

router.post('/signin', async (req, res) => {
  try{
    const { email, password } =req.body;
    const seeker = await Seeker.find({email});
    if(seeker[0] && (await bcrypt.compare(password, seeker[0].toJSON().password))){
      const token = await jwt.sign(seeker[0].toJSON(), config.secretOrKey,{
        expiresIn:360000
      });
      console.log(email, password)

      return res.json({
        success:true,
        message: seeker.firstname +"signed in successfully!",
        accessToken:"HS-" + token,
        type:'seeker',
        seeker:{
          id: seeker._id,
          firstname: seeker.firstname,
          lastname: seeker.lastname,
          addresss: seeker.address,
          email: seeker.address,
          phonenumber: seeker.phonenumber,
        }
      })
    }
    return res.json({
      success:false,
      message: "Invalid Credentials",
    })
  }catch(err){
    console.log(err)
    res.json({
      success: false,
      message: 'Internal Server Error',
      error: err
    })
  }
})
router.get('/', async (req, res) => {

})

router.get('/:id', async (req, res) => {
  // try {
  //   const baby = await Baby.findById(req.params.id)
  //     .populate({
  //       path: 'literId',
  //       populate: {
  //         path: 'literDad',
  //         populate: {
  //           path: 'petTypeId',
  //         },
  //       },
  //     })
  //     .populate('petDescriptionId')
  //   res.json({
  //     success: true,
  //     baby: {
  //       babyId: baby._id,
  //       literId: baby.literId,
  //       babyName: baby.babyName,
  //       babyDOB: baby.babyDOB,
  //       babyGender: baby.babyGender,
  //       petDescriptionId: baby.petDescriptionId,
  //       babyPic1: baby.babyPic1,
  //       babyPic2: baby.babyPic2,
  //       babyPic3: baby.babyPic3,
  //       babyPic4: baby.babyPic4,
  //       babyPic5: baby.babyPic5,
  //       babyPic6: baby.babyPic6,
  //       babyPrice: baby.babyPrice,
  //       babyStatus: baby.babyStatus,
  //     },
  //   })
  // } catch (err) {
  //   console.error(err.message)
  //   res.status(500).send('Server Error')
  // }
})

router.delete('/:id', async (req, res) => {
  // try {
  //   await Baby.findOneAndDelete({ _id: req.params.id })
  //   res.json({
  //     state: true,
  //   })
  // } catch (err) {
  //   console.error(err.message)
  //   res.status(500).send('Server Error')
  // }
})

module.exports = router
