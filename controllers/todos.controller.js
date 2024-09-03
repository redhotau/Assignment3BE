const { Todo } = require("../models");

exports.index = async (req, res) => {
    try {
      const todos = await Todo.findAll();
      res.status(200).json(todos);
    } catch (error) {
      // console.log(error);
      res.status(500).json({
        error: error.name,
        message: error.message,
      });
    }
  };

  exports.show = async (req, res, next) => {
    const { id } = req.params;
    try {
        const todos = await Todo.findByPk(id);
        if (!todos) return res.status(404).json({
          error: "NotfoundError",
          message: "Todo is not found",
      })
        res.status(200).json(todos);
      } catch (error) {
        // console.log(error);
        res.status(500).json({
          error: error.name,
          message: error.message,
        });
      }
  }