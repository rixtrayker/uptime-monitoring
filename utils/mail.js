const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const config = require('../config/mail');
class MailUtil {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
  }

  renderTemplate(templateName, data) {
    const templatePath = path.join(__dirname, '/../views/templates', `${templateName}.hbs`);
    const template = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(template);
    const renderedTemplate = compiledTemplate(data);
    return renderedTemplate;
  }

  getMailOptions(userEmail, reportData) {
    const renderedTemplate = this.renderTemplate('notification', reportData);

    return {
      from: config.sender,
      to: userEmail,
      subject: 'Monitoring Notification',
      html: renderedTemplate,
    };
  }

  async sendMail(userEmail, reportData) {
    try {
      const mailOptions = this.getMailOptions(userEmail, reportData);
      const info = await new Promise((resolve, reject) => {
        this.transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });

      return info;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MailUtil;
