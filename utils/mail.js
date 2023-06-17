const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

class MailService {
  constructor(config) {
    // Configure the nodemailer transporter
    this.transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.user,
        pass: config.password,
      },
    });
  }

  renderTemplate(templateName, data) {
    const templatePath = path.join(__dirname, 'views/templates', `${templateName}.hbs`);
    const template = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(template);
    const renderedTemplate = compiledTemplate(data);
    return renderedTemplate;
  }

  getMailOptions(userEmail,message) {
    const renderedTemplate = renderTemplate('notification', { message });

    return {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Monitoring Notification',
      html: renderedTemplate,
    };
  }

  sendMail(mailOptions) {
    return new Promise((resolve, reject) => {
      // Send the email
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }
}

module.exports = MailService;
