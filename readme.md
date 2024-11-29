# Inventory Management Chatbot

A chatbot designed to help small businesses manage their inventory efficiently. The bot allows users to interact with their inventory system using natural language commands such as adding items, updating stock levels, and viewing inventory details. The project integrates Dialogflow for natural language understanding, MongoDB for data storage, and Render for cloud hosting.
## Demo:








https://github.com/user-attachments/assets/898aaa0c-5a17-4617-b05d-c964806300d6





## Features

- **Natural Language Commands**: Users can add, update, view, or delete inventory items using simple text-based commands.
- **AI-Powered**: Integrates with Dialogflow to process and understand user inputs.
- **Scalable Backend**: Built with Node.js and MongoDB for handling inventory data.
- **Cloud-Hosted**: Deployed on Render for seamless and reliable access.

## System Architecture

1. **Frontend**: Simple HTML/CSS/JavaScript-based chatbot interface.
2. **Backend**: Node.js API to handle inventory operations and communicate with the Dialogflow API.
3. **Database**: MongoDB for storing inventory details.
4. **Cloud Hosting**: Render for deploying the backend service and managing logs.

## Installation and Setup
You can find it live [here](https://tour-api-04ar.onrender.com) or you can run it locally:

### Prerequisites

- **Node.js** installed on your system.
- **MongoDB Atlas** account (or local MongoDB instance).
- **Dialogflow** account for intent management.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/fara77ezma/inventory-management-chatbot.git
   cd inventory-management-chatbot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a .env file in the project root and add the following
   ```env
    MONGO_URI=your-mongodb-connection-string
    GOOGLE_APPLICATION_CREDENTIALS=your-dialogflow-service-account-private-key
   ```

4. Change the URL in the fetch function in the app.js file to http://localhost:3000:
    Open the public/app.js file in your code editor.
   Locate the fetch function where the URL is defined.
   Change the URL to :
   ```js
    fetch('http://localhost:3000/api/chat')
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. Open your chatbot interface in a browser:

   If you are using a local server, go to http://localhost:3000.

## Usage

### Supported commands include:

- **Check for specific items**:

  - `"Do we have bottles? Show the details."`
  - `"Show info about laptops in stock."`
  - `"What is the quantity and price of tables?"`

- **Display all items**:

  - `"Display all items."`
  - `"Show me everything in stock."`

- **Update item price and quantity**:

  - `"I need to change the price of chairs to $150 and decrease the quantity to 15."`
  - `"Update the price of laptops to $1200."`

- **Delete item**:

  - `"Delete laptops from the inventory."`
  - `"Can you remove printers?"`

- **Add item**:
  - `"Can you add 30 desks to my stock with cost $30 each?"`
  - `"Please add 15 monitors at $200 each."`

## Example Interaction

### Adding an Item

**User**: `"Can you add 30 desks to my stock with cost $30 each?"`  
**Bot**: `"The item desks has been added to the inventory with a quantity of 30 and a price of $30."`

### Querying Item Information

**User**: `"Do we have bottles? Show the details."`  
**Bot**: `"Details for bottles : Quantity: 15 , Price: 15$."`

### Updating Item Details

**User**: `"I need to change the price of chairs to $150 and decrease the quantity to 15."`  
**Bot**: `"The item '${item}' has been updated to Quantity: 15, Price: $150."`

### Deleting Items

**User**: `"Delete laptops from the inventory."`  
**Bot**: `"The item laptops has been deleted from the inventory."`

### Displaying All Items

**User**: `"Display all items."`  
**Bot**: `"Here are the available items: \n- Apples: Quantity: 5, Price: $3 \n- Chairs: Quantity: 15, Price: $150"`

## Deployment on Render

1. Push your project to GitHub.
2. Connect your Render account to your GitHub repository.
3. Deploy the service:
   - Create a new web service on Render.
   - Add environment variables in the Render dashboard as specified in `.env`.
   - Use `npm start` as the start command.
4. Access the deployed chatbot via the provided Render URL.

## Troubleshooting

### Dialogflow API Errors:

- Ensure your service account key is correctly configured in `.env`.

### Database Connection Issues:

- Verify that your `MONGO_URI` is correct and accessible.

### Render Deployment Problems:

- Check application logs in the Render dashboard for debugging.
