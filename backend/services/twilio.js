import twilio from "twilio";

// Initialize Twilio client with your account SID and auth token
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Function to send WhatsApp message
const sendWhatsAppMessage = async (to, body) => {
  to = "+94770664182";
  try {
    const message = await client.messages.create({
      body: body,
      from: "whatsapp:" + process.env.TWILIO_WHATSAPP_NUMBER,
      to: "whatsapp:" + to,
    });

    console.log("WhatsApp message sent successfully. SID:", message.sid);
    return message;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    throw error;
  }
};

export default sendWhatsAppMessage;
