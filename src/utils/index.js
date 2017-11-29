const utils = {}

module.exports = utils;

utils.getEmailId = (user)=>{
  console.log("getEmailId");
    let email = user.email;
    console.log(email.indexOf('@')); 
    let emailId = email.slice(0,email.indexOf('@'));
    return emailId;
  }

  