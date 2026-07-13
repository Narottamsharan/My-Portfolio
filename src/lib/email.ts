import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_tp228vj';
const CONTACT_TEMPLATE_ID = 'template_6c848kr';
const AUTO_REPLY_TEMPLATE_ID = 'template_mtps97d';
const PUBLIC_KEY = '_iN_Z1PifU03pU2qC';

export interface ContactFormData {
  name: string;
  email: string;
  project_type: string;
  budget?: string;
  message: string;
}

export const sendContactEmail = async (data: ContactFormData) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      CONTACT_TEMPLATE_ID,
      {
        name: data.name,
        email: data.email,
        project_type: data.project_type,
        budget: data.budget || '',
        message: data.message
      },
      {
        publicKey: PUBLIC_KEY,
      }
    );
    return response;
  } catch (error: any) {
    console.error('EmailJS sendContactEmail error:', error);
    throw error;
  }
};

export const sendAutoReply = async (data: ContactFormData) => {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      AUTO_REPLY_TEMPLATE_ID,
      {
        name: data.name,
        email: data.email
      },
      {
        publicKey: PUBLIC_KEY,
      }
    );
    return response;
  } catch (error: any) {
    console.error('EmailJS sendAutoReply error (continuing anyway):', error);
  }
};
