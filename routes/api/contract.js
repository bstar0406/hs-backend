const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/keys')
const router = express.Router()

// Load User model
const Contract = require('../../models/Contract')
// @route POST api/babies/
// @desc Register user
// @access Public
router.post('/:id', async (req, res) => {
  try {
    const { seekerID  } = req.body
    console.log(req.params.id, seekerID)
    let contract =  (await Contract.find({_id:req.params.id}))[0]
    contract.seekerID = seekerID;
    contract.published = "done"

    await contract.save()
    const token = await jwt.sign(contract.toJSON(), config.secretOrKey, {
      expiresIn: 36000,
    })
    return res.json({
      success: true,
      message: contract.published==='1'?'The contract is created successfully.':'The contract is saved.',
      accessToken:"HS-" + token,
      contract:contract
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

router.post('/review/company/:id', async (req, res) => {
  try {
    const { rating, review  } = req.body
    let contract =  (await Contract.find({_id:req.params.id}))[0]
    contract.companyRating = Math.round(rating);
    contract.companyReview = review

    await contract.save()
    const token = await jwt.sign(contract.toJSON(), config.secretOrKey, {
      expiresIn: 36000,
    })
    return res.json({
      success: true,
      message: contract.published==='1'?'The contract is created successfully.':'The contract is saved.',
      accessToken:"HS-" + token,
      contract:contract
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

router.post('/review/seeker/:id', async (req, res) => {
  try {
    const { rating, review  } = req.body
    let contract =  (await Contract.find({_id:req.params.id}))[0]
    contract.seekerRating = Math.round(rating);
    contract.seekerReview = review

    await contract.save()
    const token = await jwt.sign(contract.toJSON(), config.secretOrKey, {
      expiresIn: 36000,
    })
    return res.json({
      success: true,
      message: contract.published==='1'?'The contract is created successfully.':'The contract is saved.',
      accessToken:"HS-" + token,
      contract:contract
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

router.post('/', async (req, res) => {
  try {
    const { contract  } = req.body
    console.log(contract)
    let newContract = new Contract({
      ...contract
    })
    await newContract.save()
    const token = await jwt.sign(newContract.toJSON(), config.secretOrKey, {
      expiresIn: 36000,
    })
    return res.json({
      success: true,
      message: contract.published==='1'?'The contract is created successfully.':'The contract is saved.',
      accessToken:"HS-" + token,
      contract:newContract
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

router.get('/', async (req, res) => {
  let contracts =  await Contract.find({published:'submit'}).populate('companyId').populate('seekerID').sort({createdAt:-1})
  console.log(contracts)
  res.json({
    success: true,
    message: 'Contracts successfully',
    contracts:contracts
  })
})

router.get('/:id', async (req, res) => {
  let contracts =  await Contract.find({companyId:req.params.id}).populate('companyId').populate('seekerID').sort({createdAt:-1})
  console.log(contracts)
  res.json({
    success: true,
    message: 'Contracts successfully',
    contracts:contracts
  })
})
router.get('/seeker/:id', async (req, res) => {
  let contracts =  await Contract.find({seekerID:req.params.id}).populate('companyId').populate('seekerID').sort({createdAt:-1})
  console.log(contracts)
  res.json({
    success: true,
    message: 'Contracts successfully',
    contracts:contracts
  })
})

router.get('detail/:id', async (req, res) => {
  let contracts =  await Contract.find({id:req.params.id}).populate('companyId').sort({createdAt:-1})
  console.log(contracts)
  res.json({
    success: true,
    message: 'Contracts successfully',
    contract:contracts[0]
  })
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
