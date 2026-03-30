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

app.put("/users/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' })
        res.json(updatedUser)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error updating user")
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

/* original app.get code
app.get("/items", async (req, res) => {
    try {
        const filter = req.query.sellerId ? { sellerId: req.query.sellerId } : {};
        const items = await Item.find(filter).populate("location").populate("tags")
        res.json(items)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error retrieving items")
    }
})*/

app.get("/items", async (req, res) => {
    try {
        const search = req.query.search ? req.query.search.trim() : "";
        const tag = req.query.tag ? req.query.tag.trim() : "";
        const sellerId = req.query.sellerId ? req.query.sellerId.trim() : "";

        let query = {};

        if (sellerId) {
            query.sellerId = sellerId;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        if (tag && tag !== "All") {
            const foundTags = await Tag.find({
                name: { $regex: `^${tag}$`, $options: "i" }
            });

            const tagIds = foundTags.map((t) => t._id);

            query.tags = { $in: tagIds };
        }

        const items = await Item.find(query)
            .populate("location")
            .populate("tags");

        res.json(items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving items" });
    }
});

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

// testing seed items creation
app.get("/seedItems", async (req, res) => {
    try {
        const user1 = await User.findOne({ username: "testuser1" });
        const user2 = await User.findOne({ username: "testuser2" });

        if (!user1 || !user2) {
            return res.status(400).json({
                message: "Seed failed. Make sure testuser1 and testuser2 exist in the users collection first."
            });
        }

        const techTag = await Tag.findOne({ name: "Tech" });
        const textbooksTag = await Tag.findOne({ name: "Textbooks" });
        const furnitureTag = await Tag.findOne({ name: "Furniture" });
        const clothesTag = await Tag.findOne({ name: "Clothes" });
        const electronicsTag = await Tag.findOne({ name: "Electronics" });
        const schoolSuppliesTag = await Tag.findOne({ name: "School Supplies" });
        const miscTag = await Tag.findOne({ name: "Misc" });

        const library1 = await Location.findOne({ name: "Library Floor 1" });
        const library2 = await Location.findOne({ name: "Library Floor 2" });
        const library3 = await Location.findOne({ name: "Library Floor 3" });
        const studentUnion1 = await Location.findOne({ name: "Student Union Floor 1" });
        const studentUnion2 = await Location.findOne({ name: "Student Union Floor 2" });
        const studentUnion4 = await Location.findOne({ name: "Student Union Floor 4" });
        const classroom1 = await Location.findOne({ name: "Classroom Building 1" });
        const classroom2 = await Location.findOne({ name: "Classroom Building 2" });

        if (
            !techTag || !textbooksTag || !furnitureTag || !clothesTag ||
            !electronicsTag || !schoolSuppliesTag || !miscTag ||
            !library1 || !library2 || !library3 ||
            !studentUnion1 || !studentUnion2 || !studentUnion4 ||
            !classroom1 || !classroom2
        ) {
            return res.status(400).json({
                message: "Seed failed. Make sure tags and locations are seeded first."
            });
        }

        const sampleItems = [
            {
                title: "Wireless Keyboard",
                description: "Good condition keyboard for class or dorm setup.",
                price: 20,
                sellerId: user1._id.toString(),
                tags: [techTag._id],
                location: library1._id,
                pickupTime: "MON/WED - 12:00-2:00",
                image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80"
            },
            {
                title: "Javascript Textbook",
                description: "Used textbook for javascript courses.",
                price: 25,
                sellerId: user1._id.toString(),
                tags: [textbooksTag._id],
                location: studentUnion2._id,
                pickupTime: "TUE/THU - 1:00-3:00",
                image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1200&auto=format&fit=crop"
            },
            {
                title: "Desk Lamp",
                description: "Perfect for dorm desks and late-night studying.",
                price: 12,
                sellerId: user1._id.toString(),
                tags: [furnitureTag._id],
                location: classroom1._id,
                pickupTime: "FRI/SAT - 10:00-12:00",
                image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"
            },
            {
                title: "Bluetooth Headphones",
                description: "Noise-friendly headphones for campus use.",
                price: 20,
                sellerId: user2._id.toString(),
                tags: [electronicsTag._id],
                location: library3._id,
                pickupTime: "SAT/SUN - 11:00-1:00",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
            },
            {
                title: "Notebook Set",
                description: "Helpful for notes, planning, and assignments.",
                price: 8,
                sellerId: user2._id.toString(),
                tags: [schoolSuppliesTag._id],
                location: classroom2._id,
                pickupTime: "TUE/WED - 9:00-11:00",
                image: "https://images.unsplash.com/photo-1625533617580-3977f2651fc0?q=80&w=2070&auto=format&fit=crop&w=900&q=80"
            },
            {
                title: "Yellow Chair",
                description: "Brighten up your dorm with this comfortable chair.",
                price: 30,
                sellerId: user2._id.toString(),
                tags: [furnitureTag._id],
                location: studentUnion4._id,
                pickupTime: "WED/SAT - 2:00-4:00",
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80"
            },
            {
                title: "Storage Bin",
                description: "Useful extra storage for dorm rooms.",
                price: 5,
                sellerId: user2._id.toString(),
                tags: [miscTag._id],
                location: library2._id,
                pickupTime: "THU/FRI - 3:00-5:00",
                image: "https://plus.unsplash.com/premium_photo-1664033881717-1980c19d9ade?q=80&w=1064&auto=format&fit=crop&w=900&q=80"
            }
        ];

        let addedCount = 0;
        let existingCount = 0;

        for (const item of sampleItems) {
            const existingItem = await Item.findOne({ title: item.title });

            if (!existingItem) {
                await Item.create(item);
                addedCount++;
            } else {
                existingCount++;
            }
        }

        res.json({
            message: "Seed items completed",
            added: addedCount,
            alreadyExisted: existingCount
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error seeding sample items" });
    }
});

// testing seeding users
app.get("/seedUsers", async (req, res) => {
    try {
        const users = [
            {
                username: "testuser1",
                email: "test1@ucf.edu",
                password: "123456",
                role: "user"
            },
            {
                username: "testuser2",
                email: "test2@ucf.edu",
                password: "123456",
                role: "user"
            },
            {
                username: "admin",
                email: "admin@ucf.edu",
                password: "admin123",
                role: "admin"
            }
        ];

        let added = 0;
        let existing = 0;

        for (const user of users) {
            const exists = await User.findOne({ username: user.username });

            if (!exists) {
                await User.create(user);
                added++;
            } else {
                existing++;
            }
        }

        res.json({
            message: "Seed users completed",
            added,
            existing
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error seeding users" });
    }
});

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

app.post("/locations", async (req, res) => {
    try {
        const newLocation = new Location(req.body);
        await newLocation.save();
        res.json({ message: "Location created successfully", location: newLocation });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating location");
    }
});

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
        //await Location.deleteMany({})
        //await Tag.deleteMany({})
        let locAdded = 0;
        let tagAdded = 0;

        for (let loc of locations) {
            const exists = await Location.findOne({ name: loc });
            if (!exists) {
                await new Location({ name: loc }).save();
                locAdded++;
            }
        }
        
        for (let tag of tags) {
            const exists = await Tag.findOne({ name: tag });
            if (!exists) {
                await new Tag({ name: tag }).save();
                tagAdded++;
            }
        }

        res.json({
            message: "Database seeded successfully",
            locationsAdded: locAdded,
            tagsAdded: tagAdded
        });
    } catch (error) {
        console.log(error)
        res.status(500).send("Error seeding database")
    }
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})