import User from "../models/userModel.js";

const checkUserExists = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ exists: userCount > 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { checkUserExists };
