import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_tp228vj';
const CONTACT_TEMPLATE_ID = 'template_6c848kr';
const PUBLIC_KEY = '_iN_Z1PifU03pU2qC';

emailjs.send(
  SERVICE_ID,
  CONTACT_TEMPLATE_ID,
  {
    name: 'test',
    email: 'test@test.com',
    project_type: 'test',
    budget: 'test',
    message: 'test',
  },
  { publicKey: PUBLIC_KEY }
).then(res => console.log(res)).catch(err => console.error('ERROR', err));
