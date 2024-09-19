# SafeBeautyLedger

SafeBeautyLedger is a web application designed to manage and track beauty products through their lifecycle. It provides functionalities for manufacturers to add, update, and view products, as well as track their status and history. The 

## Tech Stack

- **Frontend**: React with Next.js, TypeScript, and Shopify Polaris for UI components.
- **Backend**: ExpressJS with Next.js API routes.
- **Authentication**: Iron Session for session management.
- **Styling**: CSS Modules.

## Setup Locally

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/safebeautyledger.git
    cd safebeautyledger
    ```

2. **Install dependencies**:
    ```sh
    npm install
    # or
    yarn install
    ```

3. **Create a `.env.local` file** in the root directory and add the following environment variables:
    ```sh
    NEXT_PUBLIC_API_URL=http://localhost:3001
    SECRET_COOKIE_PASSWORD=your-secret-cookie-password-at-least-32-characters-long
    ```

4. **Run the development server**:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

