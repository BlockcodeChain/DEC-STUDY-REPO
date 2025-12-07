import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import generateToken from "../config/jwt.js";

// ---------------- SIGNUP --------------------
export const signup = async (req, res) => {
  try {
    const { fullname, username, email, password, confirmpassword, gender } = req.body;

    // 1. Check fields
    if (!fullname || !username || !email || !password || !confirmpassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check password match
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Password and confirm password do not match" });
    }

    // 3. User exists?
    const existUser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 4. Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // 5. Create new user
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
      gender
    });

    await newUser.save();

    // 6. Generate token
    const token = generateToken({ id: newUser._id });

    // 7. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      gender: newUser.gender,
      message: "User registered successfully"
    });

  } catch (err) {
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// ---------------- LOGIN --------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // 3. Compare password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 4. Create token
    const token = generateToken({ id: user._id });

    // 5. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      message: "Login successful"
    });

  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ---------------- LOGOUT --------------------
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
