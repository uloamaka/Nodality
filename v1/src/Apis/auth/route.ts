import Router from 'express';
import Controller from './controller';

const route = Router();
const Ctrl = new Controller();

// For the auth APIs
route.post('/auth/register', Ctrl.register.bind(Ctrl)); // -register
route.post('/auth/login', Ctrl.login.bind(Ctrl)); // -login
route.post('/forget-password', Ctrl.forgotPassword.bind(Ctrl));
route.post('/reset-password/:userId/:resetToken', Ctrl.resetPassword.bind(Ctrl));


// route.post('/auth/send-otp', Ctrl.sendOtp.bind(Ctrl)); // -send OTP or forget password | resend forget password
// route.post('/auth/verify-otp', Ctrl.verifyOtp.bind(Ctrl)); // -verify OTP
// route.patch('/auth/reset-password/:email', Ctrl.resetPassword.bind(Ctrl)); // -reset PAssword

export default route;
