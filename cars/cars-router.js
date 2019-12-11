const express = require("express");

// database access using knex
const knex = require("../data/dbConfig.js");

const router = express.Router();

// Middleware

function validateCar(req, res, next) {
    if (req.body && Object.entries(req.body).length > 0 && req.body.VIN && req.body.make && req.body.model && req.body.milage) {
        if(!isNaN(req.body.milage)) {
            next();
        }
        else {
            res.status(400).json({ message: "Please enter a number for milage" });
        }
    } else if (req.body && Object.entries(req.body).length > 0) {
        res.status(400).json({ message: "Please enter provide values for VIN, make, model, milage, transmissiontype (optional), and status (optional)." });
    } else {
        res.status(400).json({ message: "Please enter the data for the car." });
    }
}

// return a list of cars from the database
router.get("/", (req, res) => {
    // select * from accounts
    knex
        .select("*")
        .from("cars")
        .then(cars => {
        res.status(200).json(cars);
        })
        .catch(err => {
        console.log(err);
            res.status(500).json({ error: "Error getting the list of cars." });
        });
});

// return a specific car by id
router.get("/:id", (req, res) => {
    // select * from accounts where id = req.params.id
    knex
        .select("*")
        .from("cars")
        // .where("id", "=", req.params.id)
        .where({ id: req.params.id })
        .first()
        .then(car => {
            res.status(200).json(car);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Error getting the car" });
        });
});

// add a car
router.post("/", validateCar, (req, res) => {
    const carData = req.body;

    knex("cars")
        .insert(carData, "id")
        .then(ids => {
            const id = ids[0];
            return knex("cars")
                .select("*")
                .where({ id })
                .first()
                .then(car => {
                    res.status(201).json(car);
                });
        }) 
        .catch(error => {
        console.log(error);
        res.status(500).json({
            error: "Error adding the car."
        });
    });
});

// update a car
router.put("/:id", validateCar, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    // validate the data
    knex("cars")
        .where({ id })
        .update(changes)
        .then(count => {
        if (count > 0) {
            res.status(200).json({ message: `${count} car(s) updated` });
        } else {
            res.status(404).json({ message: "Car not found" });
        }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "Error updating the car."
            });
        });
});

// delete a car
router.delete("/:id", (req, res) => {
    knex("cars")
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `${count} car(s) deleted` });
            } else {
                res.status(404).json({ message: "Car not found" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Error removing the car." });
        })
});

module.exports = router;