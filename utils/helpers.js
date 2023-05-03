const dayjs = require("dayjs");

const formatDate = (date) => {
  return dayjs(date).format("MMMM D, YYYY h:mm:ss A");
};

module.exports = { formatDate };
