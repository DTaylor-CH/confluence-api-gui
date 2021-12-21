// This will help us connect to the database
const dbo = require("../db/conn");
var { CONFLUENCE_CATEGORIES } = require("../lib/constants");

const indexController = {
  HealthCheck: (req, res) => {
    res.status(200).json({ Status: "OK" });
  },

  Index: async (req, res) => {
    const randomUntriagedPage = (await dbo.getRandom()) || {
      title: "No more pages to display",
      webui: "#",
    };

    res.render("index", {
      categories: CONFLUENCE_CATEGORIES,
      page: randomUntriagedPage,
    });
  },

  Submit: async (req, res) => {
    await dbo.postTags(req.body.postId, req.body.tags);

    res.redirect("/");
  },
};

module.exports = indexController;
