const fs = require("fs");

let emailIndex = 0;
let passwordIndex = 0;
try {
    if (fs.existsSync("emailIndex.txt")) {
        emailIndex = parseInt(fs.readFileSync("emailIndex.txt", "utf-8")) || 0;
    }
    if (fs.existsSync("passwordIndex.txt")) {
        passwordIndex = parseInt(fs.readFileSync("passwordIndex.txt", "utf-8")) || 0;
    }
} catch (e) {
    emailIndex = 0;
    passwordIndex = 0;
}

function nextEmail(idx) {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789.";
    function toName(idx) {
        let name = "";
        let lastCharDot = false;
        do {
            let c = chars[idx % chars.length];
            if (c === "." && (name === "" || lastCharDot)) c = chars[(idx + 1) % (chars.length - 1)];
            lastCharDot = c === ".";
            name = c + name;
            idx = Math.floor(idx / chars.length) - 1;
        } while (idx >= 0);
        name = name.replace(/^\\.+|\\.+$/g, "");
        if (name.length < 6) name = name.padEnd(6, "a");
        if (name.length > 30) name = name.slice(0, 30);
        return name;
    }
    return `${toName(idx)}@gmail.com`;
}
function nextPassword(idx) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    function toPass(idx) {
        let pass = "";
        do {
            pass = chars[idx % chars.length] + pass;
            idx = Math.floor(idx / chars.length) - 1;
        } while (idx >= 0);
        if (pass.length < 8) pass = pass.padEnd(8, "a");
        return pass;
    }
    return toPass(idx);
}

// Danh sách user-agent phổ biến
const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0",
    "Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
];

function getRandomUserAgent() {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
}

async function signup() {
    const signupUrl = "http://35.77.150.219:8080/whatsapp/auth/register";
    const email = nextEmail(emailIndex);
    const password = nextPassword(passwordIndex);
    const fullName = email;
    const phone = "0" + String(Math.floor(Math.random() * 1_000_000_000)).padStart(9, "0");
    const confirmPassword = password;
    try {
        const res = await fetch(signupUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": getRandomUserAgent(),
            },
            body: JSON.stringify({ email, fullName, phone, password, confirmPassword }),
        });
        const contentType = res.headers.get("content-type") || "";
        let data;
        if (contentType.includes("application/json")) {
            data = await res.json();
        } else {
            const text = await res.text();
            console.error(`Phản hồi không phải JSON:`, text.slice(0, 100));
            return null;
        }
        if (res.status === 200 || res.status === 201) {
            console.log(`✅ Đăng ký thành công: ${email} / ${password}`);
            fs.appendFileSync("acc.txt", `${email}:${password}\n`);
            emailIndex++;
            passwordIndex++;
            fs.writeFileSync("emailIndex.txt", String(emailIndex));
            fs.writeFileSync("passwordIndex.txt", String(passwordIndex));
            return { email, password };
        } else {
            console.log(`❌ Thất bại: ${email} / ${password}`);
            console.log("Response:", data);
            emailIndex++;
            passwordIndex++;
            fs.writeFileSync("emailIndex.txt", String(emailIndex));
            fs.writeFileSync("passwordIndex.txt", String(passwordIndex));
            return null;
        }
    } catch (err) {
        console.error(`Lỗi request: ${email} / ${password}`, err.message);
        return null;
    }
}

setInterval(async () => {
    await signup();
}, 10);
