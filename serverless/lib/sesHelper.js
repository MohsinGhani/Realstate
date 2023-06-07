/* eslint-disable */

const AWS = require('aws-sdk')
AWS.config.update({ region: 'eu-central-1' })
const SES = new AWS.SES({ apiVersion: '2010-12-01' })
const { getPrimaryEmail } = require('./utils')

const sendEmails = (emails, msg, subject) => {
  let recieverEmails = [...emails]
  let adminEmails = []
  let bccEmails = recieverEmails.concat(adminEmails)

  let params = {
    Destination: {
      BccAddresses: bccEmails,
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: msg,
        },
        Text: {
          Charset: 'UTF-8',
          Data: msg,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: getPrimaryEmail(),
  }
  console.log('params', JSON.stringify(params))

  return new Promise((res, rej) => {
    SES.sendEmail(params, function (err, data) {
      if (err) {
        console.log('err', err)
        rej(err, err.stack)
      } else {
        console.log('data', data)
        res(data)
      }
    })
  })
}

const checkEmail = async (params) => {
  return await SES.getIdentityVerificationAttributes(params).promise() // Check Verify
}

const verifyEmail = async (params) => {
  return await SES.verifyEmailIdentity(params).promise() // create
}

const deleteEmail = async (params) => {
  return await SES.deleteVerifiedEmailAddress(params).promise() // delete
}

module.exports = {
  sendEmails,
  checkEmail,
  verifyEmail,
  deleteEmail,
}
