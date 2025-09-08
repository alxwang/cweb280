const express = require('express');
const app = express();
const PORT = 5000;
const { AppDataSource } = require("./db/db")
const { Member } = require("./entity/Member");
const { Book } = require("./entity/Book");
const { BorrowRecord } = require("./entity/BorrowRecord");
const exphbs = require('express-handlebars');

app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true })); // for form submissions

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Connect DB
AppDataSource.initialize().then(() => {
    console.log("DB Connected ✅");
}).catch(err => console.error(err));

app.get('/',async (req, res) => {
   try {
    const memberRepo = AppDataSource.getRepository(Member);
    const bookRepo = AppDataSource.getRepository(Book);

    const members = await memberRepo.find();
    const books = await bookRepo.find({ where: { isAvailable: true } }); // only available books

    res.render('Booking', { members, books });
  } catch (err) {
    console.error(err);
    res.send("Error fetching data");
  }
});

app.post("/borrow/check", async (req, res) => {
    const { memberId, bookId } = req.body;

    try {
        const bookRepo = AppDataSource.getRepository(Book);
        const borrowRepo = AppDataSource.getRepository(BorrowRecord);

        // 1. Check if book exists
        const book = await bookRepo.findOne({ where: { id: bookId } });
        if (!book) return res.json({ success: false, message: "Book not found." });

        // 2. Check if book is available
        if (!book.isAvailable) return res.json({ success: false, message: "Book is already borrowed." });

        // 3. Check if member already borrowed the book
        const alreadyBorrowed = await borrowRepo.findOne({
            where: { member_id: memberId, returned: false }
        });
        if (alreadyBorrowed) return res.json({ success: false, message: "You have already borrowed a book." });

        // 4. Record borrow
        const borrow = borrowRepo.create({
            book_id: bookId,
            member_id: memberId,
            returned: false
        });
        await borrowRepo.save(borrow);

        // 5. Mark book as unavailable
        book.isAvailable = false;
        await bookRepo.save(book);

        return res.json({ success: true, message: `Book "${book.title}" borrowed successfully!` });

    } catch (err) {
        console.error(err);
        return res.json({ success: false, message: "Something went wrong." });
    }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
