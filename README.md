# StripeChargeGenerator

## Getting Started

1. Install Nginx

	**Homebrew:**
	
	```bash
	brew install nginx
	brew services start nginx
	```
	
	**APT:**
	
	```bash
	sudo apt-get update
	sudo apt-get install nginx
	sudo ufw allow 'Nginx HTTP'
	```
	
2. Install OpenSSL

	**Homebrew:**
	
	```bash
	brew install openssl
	```
	
	**APT:**
	
	```bash
	sudo apt-get install openssl
	sudo apt-get install libssl-dev
	```
	
3. Create an TLS Certificate

	```bash
	openssl req \
	-newkey rsa:2048 \
	-nodes \
	-keyout stripe.key \
	-x509 \
	-reqexts SAN \
	-extensions SAN \
	-config <(cat /etc/ssl/openssl.cnf \
	<(printf '[SAN]\nsubjectAltName=DNS:stripe-generator.caleb,IP:127.0.0.1')) \
	-days 365
	-out stripe.crt
	```
	
	You will need to trust the new certificate on your machine for your browser to accept it. on macOS, you can do this by opening Keychain Access and going to `File > Import items...` (or <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>i</kbd>). Select the `stripe.crt` file that you just created. Right click on the imported certificate and select `Get Info`. In the popup that opens, toggle the `Trust` section and set `When using this certificate` to `Always trust`. When you close the info popup, you will need to enter an admin password for the changes to persist.
	
4. Start Nginx Server

	```bash
	nginx -c $(pwd)/nginx.conf
	```
	
5. Set `STRIPE_KEY` (Optional)

	In the `main.js` file, there is a `STRIPE_KEY` constant which is your public key for the Stripe API. You can change this from the random test key to your actual key.
	
6. Change Form Action (Optional)

	Change the credit card form action if you want to send the information to a differnet location.

7. You're Raedy to Go!
	