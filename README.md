# Summer's Dogs Website (Self-Hosted Version)

Welcome to the self-hosted codebase for **Summer's Dogs** (an Arkansas 501(c)(3) Nonprofit providing task-trained service dogs, obedience training, and therapy dog services).

This project has been completely recreated from `summersdogs.com` into clean, modern, responsive static web code (HTML5, CSS3, Vanilla JavaScript) with zero build tool dependencies. All images and assets are stored locally within the project, ensuring 100% self-containment with no dependency on Squarespace CDN or third-party builders.

---

## 📁 Project Structure

```text
summersdogs/
├── index.html                           # Homepage & mission highlight
├── service-dogs.html                    # Service dog training, tasks, & sliding scale
├── obedience.html                       # 4-stage obedience curriculum & courses
├── helping-out.html                     # Puppy raiser guide & donation sponsorship
├── health-testing.html                  # DNA (Embark), PennHIP & OFA health testing
├── ourpack.html                         # Team bios & canine profiles
├── gallery.html                         # Photo gallery with interactive lightbox
├── contact.html                         # Contact details & direct inquiry form
│
└── assets/
    ├── css/
    │   └── style.css                    # Unified responsive stylesheet
    ├── js/
    │   ├── main.js                      # Navigation, gallery lightbox, toast alerts
        └── images/                          # All localized photography & brand logos
```

---

## 🚀 How to Run Locally

Because this project is built with clean static standards, you can preview it immediately:

### Option 1: Direct Browser
Double-click `index.html` to open it in Chrome, Edge, Firefox, or Safari.

### Option 2: Local HTTP Server (Recommended)
Open a terminal inside this directory and run:
```bash
# Python 3
python -m http.server 8000

# or Node.js npx
npx serve
```
Then visit `http://localhost:8000` in your web browser.

---

## 🌐 Self-Hosting Deployment Options

You can host this website virtually anywhere for free or low cost:

### 1. Cloudflare Pages / Netlify / Vercel (Recommended & Free)
1. Push this folder to a GitHub, GitLab, or Bitbucket repository.
2. Sign in to [Cloudflare Pages](https://pages.cloudflare.com/), [Netlify](https://www.netlify.com/), or [Vercel](https://vercel.com/).
3. Connect your repository.
4. Set Build Command to **blank** (none needed) and Publish Directory to **`.`** (root).
5. Click **Deploy**. Your site will be live with free global CDN and automatic SSL certificate.

### 2. GitHub Pages (Free)
1. Push the code to a GitHub repository named `your-username.github.io` (or any repository).
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
4. Set up your custom domain `summersdogs.com` under Custom Domain settings.

### 3. Traditional Web Hosting (cPanel / Apache / Nginx / VPS)
- **cPanel / Shared Hosting:** Simply zip this folder or upload all files directly into your `public_html` directory via FTP / File Manager.
- **Nginx:** Point your `root` directive to this directory:
  ```nginx
  server {
      listen 80;
      server_name summersdogs.com www.summersdogs.com;
      root /var/www/summersdogs;
      index index.html;
      location / {
          try_files $uri $uri/ =404;
      }
  }
  ```

---

## ✉️ Connecting Forms (Contact & Applications)

The forms on `contact.html`, `service-dogs.html`, and `helping-out.html` include client-side validation and immediate visual feedback. To receive submissions directly to your email (`summersdogs.com@gmail.com`), you can connect any free form endpoint:

### Formspree (Easiest)
1. Register for free at [Formspree.io](https://formspree.io).
2. Create a form and copy your endpoint ID (e.g. `https://formspree.io/f/xyzaqwop`).
3. Update the `<form>` tag in `contact.html`, `service-dogs.html`, and `helping-out.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_ENDPOINT_ID" method="POST">
   ```

### Web3Forms
1. Get an access key at [Web3Forms.com](https://web3forms.com/) delivered to your email.
2. Add `<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">` inside the form.

---

## 💳 Connecting Payments & Checkout

The interactive shopping cart (`cart.html`) and "Add to Cart" buttons manage items and totals in the user's browser using `localStorage`.

To accept real credit card or PayPal payments online:
- **Stripe Payment Links / Stripe Checkout:** Generate payment links in your Stripe dashboard for the products ($30 Mystery Bag, $50 Vest, $50 Evaluation, $150 1-Day, $250 6-Week) and connect them to the checkout button in `assets/js/cart.js`.
- **PayPal Smart Buttons:** Create free PayPal donate / checkout buttons at [PayPal Developer](https://developer.paypal.com/) and place them on `cart.html` and `helping-out.html`.
- **Snipcart:** If you'd like full hosted checkout, add Snipcart's script tag for an instant floating cart.

---

## 🎨 Branding & Customization

- Colors, fonts, shadows, and spacing are defined as CSS variables at the top of `assets/css/style.css` under `:root`.
- You can change `--primary`, `--accent`, or font styles across the entire website in one place.
