// প্রয়োজনীয় লাইব্রেরিগুলো ইম্পোর্ট করা হচ্ছে
const express = require('express'); // সার্ভার তৈরির জন্য এক্সপ্রেস ফ্রেমওয়ার্ক
const axios = require('axios'); // গুগল স্ক্রিপ্ট থেকে ডাটা ফেচ করার জন্য
const cors = require('cors'); // ডোমেইন সিকিউরিটির জন্য কর্স
const app = express(); // এক্সপ্রেস অ্যাপলিকেশন শুরু করা

// শুধুমাত্র আপনার মূল ডোমেইনকে পারমিশন দেওয়া হচ্ছে
const corsOptions = {
  origin: 'https://www.swapneel.bro.bd', // আপনার মেইন ওয়েবসাইট
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // সার্ভারে কর্স পলিসি অ্যাপ্লাই করা হলো
app.use(express.json()); // ডাটা যেন জেএসন ফরম্যাটে পড়া যায়

// Render-এর Environment Settings থেকে গুগল স্ক্রিপ্ট লিঙ্কটি আসবে
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

// আপনার ওয়েবসাইট যখন রেন্ডারের এই এন্ডপয়েন্টে কল করবে
app.get('/get-data', async (req, res) => {
    
    // রিকোয়েস্টটি কোন পেজ থেকে আসছে তা চেক করা হচ্ছে
    const referer = req.headers.referer || "";
    
    // আপনার নতুন পেজের পাথ এখানে সেট করা হয়েছে
    const allowedPath = "https://www.swapneel.bro.bd/Anonymous-Message"; 

    // যদি রিকোয়েস্টটি এই পেজ থেকে না আসে তবে ডাটা দেওয়া হবে না
    if (!referer.startsWith(allowedPath)) {
        return res.status(403).json({ 
            error: "অ্যাক্সেস ডিনাইড! শুধুমাত্র Anonymous-Message পেজ থেকেই এই ডাটা দেখা সম্ভব।" 
        });
    }

    try {
        // গুগল স্ক্রিপ্ট থেকে ডাটা আনা হচ্ছে
        const response = await axios.get(GOOGLE_SCRIPT_URL);
        
        // সংগৃহীত ডাটা আপনার ফ্রন্ট-এন্ডে পাঠানো হচ্ছে
        res.json(response.data);
    } catch (error) {
        // কোনো এরর হলে সেটি কনসোলে দেখাবে
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "গুগল স্ক্রিপ্ট থেকে ডাটা লোড করা সম্ভব হয়নি" });
    }
});

// রেন্ডার অনুযায়ী পোর্ট সেট করা
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running for Swapneel's Anonymous Message project`);
});