const express = require("express");
const employeeSchema = require("../schema/employeeSchema");
const route = express.Router();
// get - post - delete
route.post("/create-employee", (req, res, next) => {
  employeeSchema.create(req.body, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});

route.get("/", (req, res, next) => {
  employeeSchema.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});
route.delete("/delete-employee/:id", (req, res, next) => {
  // console.log(req.params);
  employeeSchema.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return res.json(data);
    }
  });
});

route.post("/login", (req, res, next) => {
  const { name, email, password } = req.body;
  employeeSchema.findOne({ email: email }).then((employee) => {
    if (employee) {
      if (employee.password === password) {
        res.json("Login successfull");
      } else {
        res.json("Password errors");
      }
    } else {
      res.json("No records found");
    }
  });
});

route
  .route("/update-employee/:id")
  .get((req, res, next) => {
    employeeSchema.findById(req.params.id, (err, data) => {
      if (err) {
        return next(err);
      } else {
        return res.json(data);
      }
    });
  })
  .put((req, res, next) => {
    employeeSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      (err, data) => {
        if (err) {
          return next(err);
        } else {
          return res.json(data);
        }
      }
    );
  });

module.exports = route;
