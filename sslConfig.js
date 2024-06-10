import fs from "node:fs";

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/fdiaznem.me/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/fdiaznem.me/fullchain.pem')
};

export default options;