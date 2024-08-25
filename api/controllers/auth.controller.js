import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.json({ message: 'Signup Successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const signin = async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password || username === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }
    try {
        const validUser = await User.findOne({ username });
        if (!validUser) {
            return next(errorHandler(400, 'User not found'));
        }
        const validPass = bcryptjs.compareSync(password, validUser.password);
        if (!validPass) {
            return next(errorHandler(400, 'Invalid Password'));
        }
        const token = jwt.sign(
            { id: validUser._id },
           'samyak'
        );

        const { password: pass, ...rest } = validUser._doc;

      res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
    } catch (error) {
        return next(errorHandler(500, error.message));
    }
}

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                'samyak'
            );
            const { password, ...rest } = user._doc;
          res
          .status(200)
          .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign(
              { id: newUser._id, isAdmin: newUser.isAdmin },
              'samyak'
            );
            const { password, ...rest } = newUser._doc;
            res
              .status(200)
              .cookie('access_token', token, {
                httpOnly: true,
              })
              .json(rest);
        }
    } catch (error) {
        next(error);
    }
};
