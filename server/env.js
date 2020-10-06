const clientRoot = (process.env.NODE_ENV === 'production') ? 'https://moodify.ca' : 'http://localhost:3000';
const serverRoot = (process.env.NODE_ENV === 'production') ? 'https://moodify.ca/c' : 'http://localhost:9000';

module.exports = { clientRoot, serverRoot };
