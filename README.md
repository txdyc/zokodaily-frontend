<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/7fafd120-44c8-47f9-a924-d2943e511719

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Set `VITE_API_BASE_URL` in `.env.local` when your Flask API runs outside the default `http://127.0.0.1:5000`
4. Run the app:
   `npm run dev`

## Ubuntu build and deploy

- Script: `scripts/deploy_ubuntu.sh`
- Default deploy path: `/var/www/zokodaily-frontend`
- After deployment it runs: `systemctl reload nginx`

### Usage

```bash
cd frontend
chmod +x ./scripts/deploy_ubuntu.sh
./scripts/deploy_ubuntu.sh
```

### Optional environment variables

- `DEST_DIR` — target directory, default `/var/www/zokodaily-frontend`
- `NGINX_SERVICE` — nginx service name, default `nginx`
- `INSTALL_DEPS` — `true|false|auto`, default `auto`
- `NODE_BIN` — explicit Node.js binary path
- `NPM_BIN` — explicit npm binary path

### Example

```bash
DEST_DIR=/var/www/zokodaily-frontend \
NGINX_SERVICE=nginx \
INSTALL_DEPS=true \
./scripts/deploy_ubuntu.sh
```
