const dialogflow = require("dialogflow");
const sessionClient = new dialogflow.SessionsClient();
const projectId = "chatbot-nqfq";
const sessionId = "test-session-id";
const sessionPath = sessionClient.sessionPath(projectId, sessionId);
const inventoryController = require("./inventoryController");

async function processUserInput(userInput) {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userInput,
        languageCode: "en",
      },
    },
  };

  try {
    const [response] = await sessionClient.detectIntent(request);
    const result = response.queryResult;

    const intent = result.intent.displayName;
    const parameters = result.parameters.fields;

    console.log("Intent:", intent);
    console.log("Parameters:", parameters);

    const item = parameters.item?.stringValue || null;
    const quantity = parameters.quantity?.numberValue || null;
    const price = parameters.price?.numberValue || null;

    return { item, quantity, price, intent };
  } catch (error) {
    console.error("Error processing input:", error);
    throw new Error("Error interacting with Dialogflow");
  }
}

exports.userChat = async (req, res) => {
  const userInput = req.body.text;

  if (!userInput) {
    return res.status(400).send("User input is required.");
  }

  try {
    const { item, quantity, price, intent } = await processUserInput(userInput);
    if (intent == "Default Welcome Intent") {
      return res.status(200).json({
        response: "Hello! I'm your friendly chatbot. How can I help you today?",
      });
    } else if (intent == "add-item") {
      req.body.item = item;
      req.body.quantity = quantity || 0;
      req.body.price = price;
      await inventoryController.createInventory(req, res);
    } else if (intent == "view-item-details") {
      req.body.item = item;
      await inventoryController.getInventory(req, res);
    } else if (intent == "update-item") {
      req.body.item = item;
      req.body.quantity = quantity;
      req.body.price = price;
      await inventoryController.updateInventory(req, res);
    } else if (intent == "delete-item") {
      req.body.item = item;
      await inventoryController.deleteInventory(req, res);
    } else if (intent == "view-items") {
      await inventoryController.getAllInventory(req, res);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
};
