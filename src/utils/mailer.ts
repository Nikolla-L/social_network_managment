import { transporter } from "../config/mailer";

export const sendRegistrationWelcome = async (email: string) => {
    await transporter.sendMail({
        from: '"SNM System" <system@gmail.com>',
        to: email,
        subject: "welcome", 
        html: `<h1>მოგესალმებით!</h1><br/><p>თქვენ წარმატებით შემოუერთდით ჩვენს სოციალურ ქსელს, წინ ბევრი სიახლე გელოდებათ</p>`,
    });
}

export const sendDeleteAccountSuccess = async (email: string) => {
    await transporter.sendMail({
        from: '"SNM System" <system@gmail.com>',
        to: email,
        subject: "Account deactivation", 
        html: `<h1>მოგესალმებით!</h1><br/><p>თქვენი ექაუნთი დეაქტივირებულია. თუ თვლით რომ შეცდომას აქვს ადგილი, შეატყობინეთ საფორთს მოცემულ მისამართზე <a href="/sacxa">racxamisamarti.ge</a></p>`,
    });
}