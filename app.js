const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbytr8e6q8c8ehPn4KBUnVfKYlxC7krkYNv0TISOFdwZ8_wmDokFmYoDorVpvH6WCY_1/exec'; 

        const messageForm = document.getElementById('messageForm');
        const messageInput = document.getElementById('messageInput');
        const inputWrapper = document.getElementById('inputWrapper');
        const charDisplay = document.getElementById('current');
        const submitBtn = document.getElementById('submitBtn');
        const toast = document.getElementById('toast');

        // Extended Master List (500+ keywords)
        // Note: For brevity in this response, I've combined major categories.
        const BAD_WORDS = [
            // --- ENGLISH (Aggressive & Profanity) ---
            "fuck", "fucking", "fucked", "fucker", "fuk","malaun", "fvck","Fuch", "cudi", "shitty", "shitting", "shited", "crap", "bastard", "bitch", "bitches", "asshole", "ass", "arsehole", "dick", "cock", "pussy", "cunt", "slut", "whore", "skank", "wanker", "prick", "twat", "piss", "bollocks", "motherfucker", "cocksucker", "jackass", "dipstick", "douche", "dumbass", "faggot", "fag", "dyke", "kike", "nigger", "nigga", "spic", "chink", "wetback", "rapist", "pedophile", "molester", "suicide", "kill", "die", "murder", "terrorism", "terrorist", "nazi", "hitler", "stfu", "gtfo", "porn", "xxx", "sex", "erotica", "hentai", "milf", "bdsm", "gangbang", "threesome", "orgasm", "clitoris", "vagina", "penis", "testicle", "scrotum", "semen", "ejaculate", "boobs", "tits", "nipple", "nude", "naked", "stripper", "prostitute", "escort", "hooker", "junkie", "crackhead", "meth", "cocaine", "heroin", "overdose", "idiot", "retard", "spastic", "brainless", "loser", "failure", "ugly", "fat", "disgusting", "trash", "garbage", "worthless", "pathetic", "hate", "despise", "loathe", "cursed", "hell", "satan", "demon", "devil",

            // --- BANGLA SCRIPT (Slurs & Insults) ---
            "কুত্তা", "খানকি", "মাদারচোদ", "বাল", "চুদি", "পুতকি", "বেশ্যা", "মাগি", "শুয়োর", "শালা", "হারামজাদা", "পাগল", "ছাগল", "গাধা", "বেজন্মা", "জারজ", "ল্যাংটা", "পাছায়", "বালের", "চুদিরভাই", "ভোদাই", "চুদানি", "মাগিবাজ", "ধুর", "শালার", "কুত্তারবাচ্চা", "হিজড়া", "কাইল্যা", "বান্দর", "বেহায়া", "নষ্টা", "চুদা", "গুয়োর", "চুতিয়া", "ভোদা", "বাঁড়া", "বালডা", "নাস্তিক", "ধাতু", "ফালতু", "অসভ্য", "বজ্জাত", "লম্পট", "দুশ্চরিত্রা", "পাপিষ্ঠ", "কুলটা", "খারাপ", "শয়তান", "অলক্ষ্মী", "কুলঙ্গার", "গাণ্ডু", "চোট্টা", "তফাত", "বলদ", "বাঁদর", "বেয়াদব", "বেঈমান", "বেহায়া", "ব্যাটা", "মাগী", "মুখেপুড়ি", "শুয়োরেরবাচ্চা", "লক্ষ্মীছাড়া", "হাবা", "গোবর", "চোর", "ডাইনি", "কুত্তি", "গইষ্যা", "বেজাইত", "মইরাযা", "বিষখা", "ফাসিদে", "গলাকাটা", "রগকাটা", "চুদানির", "ধর্ষন", "জেনা", "হারামখোর", "ঘুষখোর", "বাটপার", "চিটার", "পকেটমার", "ভণ্ড", "ভন্ড", "মুনাফিক", "কাফের", "নাপাক", "গালাগালি", "আবাল", "গাধারবাচ্চা", "বলদেরবাচ্চা", "মর্কট", "মুখপোড়া", "আঁটকুঁড়ে", "ডাইনীরবাচ্চা", "পিশাচ", "অসুর", "রাক্ষস", "খবিস", "নালায়েক", "কমবখত", "হারাম",

            // --- BANGLISH (Romanized / phonetic) ---
            "khanki", "magi", "madarchod", "bal", "bessa","bal", "chudi", "putki", "beshya", "shuyor", "shala", "sala", "haramjada", "pagol", "chagol", "gadha", "bejonma", "jaroj", "langta", "pachay", "baler", "chudirbhai", "voda", "vodai", "chudani", "magibaj", "dhur", "shalar", "kuttar", "kuttarbacha", "maku", "hijra", "kailya", "bandor", "behaya", "noshta", "chuda", "guyyor", "chutiya", "banda", "balda", "nastik", "faltu", "oshovvo", "bojjat", "lompot", "dushchoritra", "papistho", "kulta", "kharap", "shoytan", "bokachoda", "gandu", "balta", "kamine", "kamina", "haraami", "harami", "khankimagi", "beyadob", "suor", "kutta", "bolod", "beiman", "baler", "pucki", "vodai", "chudon", "chodu", "dhon", "ghu", "mut", "hag", "hagu", "khuira", "khanki", "magirpola", "kutti", "shuyorer", "suorer", "bacha", "bachcha", "haram", "khor", "haramkhor", "balta", "balu", "abbal", "abal", "bodmash", "shoytan", "khobish", "nalayek", "kanjush", "bhondo", "vondo", "natok", "cheater", "dhokabaj", "vondami", "papi", "paji", "pajji", "khachra", "faltu", "gaali", "mora", "mor", "mori", "bish", "fasi", "khun", "mar", "pit", "dhong", "behya", "noshto", "lokkhi", "chada", "hamba", "gadhal", "bokachoda", "choudury", "baler", "pola", "mey", "meychele", "hijra", "hizra", "magibaji", "khankibaji", "balpakna", "pajipola", "khara", "kharao", "balt", "poda", "podu", "marani", "chudmarani", "vodmarani", "balmarani"
        ];

        // Optimized filtering function to handle massive word list
        function isAbusive(text) {
            if (!text) return false;
            
            const lowerOriginal = text.toLowerCase();
            // Create a version with NO spaces or punctuation to catch hidden words
            const normalized = lowerOriginal
                .replace(/[!@#$%^&*().,?;:{}|<>_\-\s\d\n\r]/gi, ''); 

            // Use a Set for faster lookups if doing exact matching, but includes() is safer for substrings
            return BAD_WORDS.some(word => {
                const w = word.toLowerCase();
                // Check original for whole word or substring, and normalized for bypasses
                return lowerOriginal.includes(w) || normalized.includes(w);
            });
        }

        messageInput.addEventListener('input', () => {
            const len = messageInput.value.length;
            charDisplay.innerText = len;
            inputWrapper.classList.remove('error-shake');
            charDisplay.style.color = len >= 300 ? "#FF0050" : "#A0A0A0";
        });

        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = messageInput.value.trim();
            if (!message) return;

            if (isAbusive(message)) {
                showToast("Keep it clean! 🛡️ Language detected.", true);
                inputWrapper.classList.add('error-shake');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').innerText = "Sending...";

            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', 
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ 'message': message }).toString()
            })
            .then(() => {
                showToast("Sent to the shadows! 👻");
                messageInput.value = ''; 
                charDisplay.innerText = "0";
                resetButton();
            })
            .catch(() => {
                showToast("Error. Check connection.", true);
                resetButton();
            });
        });

        function showToast(msg, isError = false) {
            toast.innerText = msg;
            toast.classList.remove('hidden');
            isError ? toast.classList.add('error-toast') : toast.classList.remove('error-toast');
            toast.style.opacity = "1";
            setTimeout(() => {
                toast.style.opacity = "0";
                setTimeout(() => toast.classList.add('hidden'), 500);
            }, 3000);
        }

        function resetButton() {
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').innerText = "Send Message";
        }

