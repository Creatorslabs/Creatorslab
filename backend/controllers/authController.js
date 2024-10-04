// backend/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// User Registration
exports.registerUser = async (req, res) => {
  const {  email } = req.body;
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

  try {

    let user = await User.findOne({ email });

    if (user) {
      if (user.isVerified) {
        // Create JWT
        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '1h' },
          (err, token) => {
            if (err) throw err;
              return res.status(200).json({
                status: 'success',
                message: 'Email already verified.',
                data: token
              });
      
           
          }
        );
      }

    }else{
      const newUser = new User({  email, verificationCode });
    await newUser.save();

    // Send Verification Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "Oladitisodiq@gmail.com",
        pass: "pbymupdgbsvlndrt",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      text: `Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(201).json({
      status: 'success',
      message: 'User registered. Check your email for verification code..',
      data: ''
    });

    }

    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Email Verification
exports.verifyEmail = async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.verificationCode !== verificationCode) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid verification code or email.',
        data: token
      });
   
    }

    user.isVerified = true;
    user.verificationCode = null; // Clear verification code after verification
    await user.save();

     // Create JWT
     const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
   
        return res.status(200).json({
          status: 'success',
          message: 'Email verified successfully.',
          data: token
        });
      }
    );
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
