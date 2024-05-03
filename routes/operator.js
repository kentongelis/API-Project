const express = require('express')

// import all your controllers

// import any middleware

// create routes
const router = express.Router()

router.post("/create", createOperator)
router.get("/find/:userId")
router.get("/find")


export default router 