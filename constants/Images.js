// local imgs
const Onboarding = require("../assets/imgs/bg.png");
const Logo = require("../assets/imgs/argon-logo.png");
const LogoOnboarding = require("../assets/imgs/argon-logo-onboarding.png");
const ProfileBackground = require("../assets/imgs/profile-screen-bg.jpg");
const RegisterBackground = require("../assets/imgs/register-bg.png");
const Pro = require("../assets/imgs/getPro-bg.png");
const ArgonLogo = require("../assets/imgs/argonlogo.png");
const iOSLogo = require("../assets/imgs/ios.png");
const androidLogo = require("../assets/imgs/android.png");
// internet imgs
const ProfilePicture = 'data:image/png;base64,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';
// docTra Images
const compassionCartoon = require("../assets/docTraMaterial/compassioncartoon.png")
const doctraLogo = require("../assets/imgs/doctraLogo.png")
const doctraLogoTransparent = require("../assets/imgs/doctraLogoTransparent.png")

const Viewed = [
  'https://images.unsplash.com/photo-1501601983405-7c7cabaa1581?fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1551798507-629020c81463?fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1503642551022-c011aafb3c88?fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?fit=crop&w=240&q=80',
];

const Products = {
  'View article': 'https://images.unsplash.com/photo-1501601983405-7c7cabaa1581?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=840&q=840',
};

export default {
  Onboarding,
  Logo,
  LogoOnboarding,
  ProfileBackground,
  ProfilePicture,
  RegisterBackground,
  Viewed,
  Products,
  Pro,
  ArgonLogo,
  iOSLogo,
  androidLogo,
  compassionCartoon,
  doctraLogo,
  doctraLogoTransparent
};