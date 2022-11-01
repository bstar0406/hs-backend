const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/keys')
const router = express.Router()

// Load User model
const Seeker = require('../../models/Seeker')
const Company = require('../../models/Company')

// @route POST api/babies/
// @desc Register user
// @access Public

router.post('/', async (req, res) => {
  try{
    const { email, password } = req.body;
    const seeker = await Seeker.find({email});
    const company = await Company.find({email});
    console.log(seeker, company)
    if(seeker[0] && (await bcrypt.compare(password, seeker[0].toJSON().password))){
      const token = await jwt.sign(seeker[0].toJSON(), config.secretOrKey,{
        expiresIn:360000
      });
      console.log(email, password)

      return res.json({
        success:true,
        message: seeker[0].firstname +" signed in successfully!",
        accessToken:"HS-" + token,
        type:'seeker',
        seeker:{
          id: seeker[0]._id,
          firstname: seeker[0].firstname,
          lastname: seeker[0].lastname,
          address: seeker[0].address,
          email: seeker[0].email,
          phone: seeker[0].phone,
        }
      })
    }
    if(company[0] && (await bcrypt.compare(password, company[0].toJSON().password))){
      const token = await jwt.sign(company[0].toJSON(), config.secretOrKey,{
        expiresIn:360000
      });
      console.log(email, password)

      return res.json({
        success:true,
        message: company[0].name +" signed in successfully!",
        accessToken:"HS-" + token,
        type:'company',
        company:{
          id: company[0]._id,
          name: company[0].name,
          address: company[0].address,
          ceo: company[0].ceo,
          vat: company[0].vat,
          email: company[0].email,
          phone: company[0].phone,
        }
      })
    }
    return res.json({
      success:false,
      message: "Unregistered user or wrong password",
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
