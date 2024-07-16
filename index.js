const server = require("./app");

const port = process.env.API_PORT || 3001;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});