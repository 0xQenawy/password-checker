# 🛡️ SecurePass Tools

<div align="center">

![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-Client--Side-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)

**Advanced Password Security Toolkit with Arabic Support & Smart Analysis.**

[ Live Demo](https://0xqenawy.github.io/password-checker) · [ Report Bug](https://github.com/0xqenawy/password-checker/issues)

</div>

---

## The Problem
Most password checkers are flawed:
1.  They ignore **Arabic names** (like *Mohamed*, *Ahmed*), which are huge security risks.
2.  They rely on basic math instead of **Pattern Recognition**.
3.  Many are **not private** (sending passwords to servers).

## The Solution
**SecurePass Tools** is a privacy-first, client-side toolkit designed to educate users and generate truly secure passwords.

### 1. Smart Password Checker
Unlike simple tools, this analyzer detects:
* ✅ **Arabic & English Names:** (e.g., `Ahmed`, `Sarah`).
* ✅ **Leetspeak:** Tricks like `Ahm3d` or `S@ra`.
* ✅ **Patterns:** Keyboards walks (`qwerty`), repetitions (`aaa`), and sequences (`123`).
* ✅ **Entropy:** Calculates real mathematical strength (bits).

### 2. Memorable Passphrase Generator
Solves the "I can't remember my password" problem.
* Generates **Diceware-style** passphrases (e.g., `Coffee-Mountain-River-7!`).
* Mathematically stronger than complex gibberish.
* **"Mix Your Word"** feature: Inject your own word into a secure random string.

---

## Tech Stack

* **Core:** HTML5, CSS3, Vanilla JavaScript (ES6+).
* **Security Engine:** [zxcvbn](https://github.com/dropbox/zxcvbn) (Dropbox's library) + **Custom Logic** for Arabic/Leetspeak.
* **Randomness:** Web Crypto API (`window.crypto`) for cryptographically secure generation.
* **Privacy:** 100% Client-Side. No data ever leaves the browser.

---

## Privacy & Security

**Zero Knowledge Architecture.**
* All calculations happen in **your browser**.
* No database, no backend, no API calls.
* You can verify this by checking the **Network Tab** in DevTools (0 requests).
* Works **Offline** after loading.

---

## Contributing

Contributions are welcome!
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---
## Note on Development:
This project was developed to demonstrate modern UI/UX principles and client-side security practices. I utilized AI tools (LLMs) to accelerate the boilerplate coding and implementation, allowing me to focus on the architecture, security logic, and user experience design.

---

<div align="center">

**Made with ❤️ for a safer web.**

</div>

