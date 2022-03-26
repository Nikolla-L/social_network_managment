import { vonage } from "../config/smsSender";

export const sendExampleSms = (numberTo: any, text: any) => {
    const from = "SNM System";
    const to = "995" + numberTo;
    vonage.message.sendSms(from, to, text, (err: Error, responseData: any) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}

export const sendCodeToPhone = (number: string, code: string) => {
    const from = "SNM System";
    const to = "995" + number;
    const text = `Your reset code is ${code}`
    vonage.message.sendSms(from, to, text, (err: Error, responseData: any) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}