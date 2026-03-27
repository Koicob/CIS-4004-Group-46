const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const User = require("./models/user")
const Item = require("./models/item")
const Offer = require("./models/offer")
const Tag = require("./models/tag")
const Location = require("./models/location")

const multer = require("multer");
const path = require("path");

const jwt = require('jsonwebtoken');

const app = express()
const PORT = 8080

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `image-${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage });

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/knightSwap")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err))

app.get("/", (req, res) => {
    res.send("Knight Swap API Running")
})

app.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        res.json({ message: "User created successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error creating user")
    }
})

app.get("/users", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error retrieving users")
    }
})

app.post("/login", async (req, res) => {
    try {
        let loginUsername = req.body.username;
        let loginPassword = req.body.password;

        const foundUser = await User.findOne({ 
            username: loginUsername, 
            password: loginPassword 
        });
        
        if (foundUser !== null) {
            const token = jwt.sign({ id: foundUser._id }, "KNIGHT-SWAP", { expiresIn: '1d' });
            res.json({ message: "Login successful", user: foundUser, token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error during login" });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { email,username, password } = req.body;

        const existingUser = await User.findOne({ username: username });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const newUser = new User({
            email,
            username,
            password,
            role: "user"
        });

        await newUser.save();

        res.json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
    }
});

app.post("/upload", upload.single("image"), (req, res) => {
    res.json({ imagePath: `http://localhost:8080/uploads/${req.file.filename}` });
});


app.post("/items", async (req, res) => {
    try {
        const newItem = new Item(req.body)
        await newItem.save()
        res.json({ message: "Item created successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error creating item")
    }
})

app.get("/items", async (req, res) => {
    try {
        const filter = req.query.sellerId ? { sellerId: req.query.sellerId } : {};
        const items = await Item.find(filter).populate("location").populate("tags")
        res.json(items)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error retrieving items")
    }
})

app.get("/items/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate("location").populate("tags")
        res.json(item)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error retrieving item")
    }
})

app.put("/items/:id", async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' })
        res.json(updatedItem)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error updating item")
    }
})

app.delete("/items/:id", async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id)
        res.json({ message: "Item deleted" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error deleting item")
    }
})

app.post("/offers", async (req, res) => {
    try {
        const newOffer = new Offer(req.body)
        await newOffer.save()
        res.json({ message: "Offer created" })
    } catch (error) {
        console.log(error)
        res.status(500).send("Error creating offer")
    }
})

app.get("/offers", async (req, res) => {
    try {
        const offers = await Offer.find()
        res.json(offers)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error retrieving offers")
    }
})

app.get("/tags", async (req, res) => {
    try {
        const tags = await Tag.find()
        res.json(tags)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error retrieving tags")
    }
})

app.get("/locations", async (req, res) => {
    try {
        const locations = await Location.find()
        res.json(locations)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error retrieving locations")
    }
})

app.get("/seedData", async (req, res) => {
    try {
        const locations = [
            "Library Floor 1",
            "Library Floor 2",
            "Library Floor 3",
            "Library Floor 4",
            "Classroom Building 1",
            "Classroom Building 2",
            "Student Union Floor 1",
            "Student Union Floor 2",
            "Student Union Floor 3",
            "Student Union Floor 4"
        ]
        const tags = [
            "Tech",
            "Textbooks",
            "Furniture",
            "Clothes",
            "Electronics",
            "School Supplies",
            "Misc"
        ]
        await Location.deleteMany({})
        await Tag.deleteMany({})
        for (let loc of locations) {
            await new Location({ name: loc }).save()
        }
        for (let tag of tags) {
            await new Tag({ name: tag }).save()
        }
        res.send("Database seeded successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send("Error seeding database")
    }
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})