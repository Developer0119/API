const User = require('../model/userModel');
const path = require('path');
const fs = require('fs');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by phone number
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ phoneNumber: req.params.phoneNumber });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user with image upload
exports.createUser = async (req, res) => {
    try {

        console.log('Received Data:', req.body);
        console.log('Uploaded Files:', req.files);
        const { name, email, password, phoneNumber } = req.body;
        
 // Use optional chaining `?.` to prevent errors
 const image = req.files?.image && req.files.image.length > 0 
 ? `uploads/${req.files.image[0].filename}`
 : null;

const pdfFile = req.files?.pdfFile && req.files.pdfFile.length > 0
 ? `uploads/${req.files.pdfFile[0].filename}`
 : null;


        
        // const image = req.file ? req.file.path : null; // Get uploaded file path image
        // const pdfFile = req.file ? req.file.path : null; // Get uploaded file path pdf

        console.log('Image Path:', image);
        console.log('PDF Path:', pdfFile);

        // const newUser = new User({ name, email, password, phoneNumber, image, pdfFile });
        const newUser = new User({
            name,
            email,
            password,
            phoneNumber,
            image: image,
            pdfFile: pdfFile
        });
        
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        
        res.status(400).json({ message: error.message });
    }
};

// Update user with image upload
exports.updateUser = async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        const user = await User.findOne({ phoneNumber });

        if (!user) return res.status(404).json({ message: "User not found" });

        // Delete old image if a new image is uploaded
        if (req.file) {
            if (user.image) {
                fs.unlinkSync(user.image); // Delete the old image file
            }
            req.body.image = req.file.path; // Store new image path
        }

        const updatedUser = await User.findOneAndUpdate({ phoneNumber }, req.body, { new: true });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user and remove image file
exports.deleteUser = async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        const user = await User.findOne({ phoneNumber });

        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.image) {
            fs.unlinkSync(user.image); // Delete the image file
        }

        await User.findOneAndDelete({ phoneNumber });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};














// const User = require('../model/userModel');



// // Get all users
// exports.getUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get user by phone number
// exports.getUserById = async (req, res) => {
//     try {
//         const user = await User.findOne({ phoneNumber: req.params.phoneNumber });
//         if (!user) return res.status(404).json({ message: "User not found" });
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Create a new user
// exports.createUser = async (req, res) => {
//     try {
//         const { name, email, password, phoneNumber } = req.body;
//         const newUser = new User({ name, email, password, phoneNumber });
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// // Update user
// exports.updateUser = async (req, res) => {
//   try {
//       const updatedUser = await User.findOneAndUpdate({ phoneNumber }, req.body, { new: true });
//       if (!updatedUser) return res.status(404).json({ message: "User not found" });
//       res.status(200).json(updatedUser);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// };

// // Delete user
// exports.deleteUser = async (req, res) => {
//     try {
//         const deletedUser = await User.findOneAndDelete(req.params.phoneNumber);
//         if (!deletedUser) return res.status(404).json({ message: "User not found" });
//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };





