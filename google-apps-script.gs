/**
 * Google Apps Script for GMC Egg My Yard order collection.
 *
 * Setup:
 * 1. Create a new Google Sheet
 * 2. Add these column headers to Row 1:
 *    Timestamp | Name | Email | Phone | Order Type | Recipient Name | Recipient Phone | Recipient Email |
 *    Address | City | State | ZIP | Package | Golden Egg | Delivery Method | Notes | Total
 * 3. Click Extensions > Apps Script
 * 4. Delete any code in the editor and paste this entire file
 * 5. Click Deploy > New deployment
 * 6. Set "Execute as" to your account
 * 7. Set "Who has access" to "Anyone"
 * 8. Click Deploy and authorize when prompted
 * 9. Copy the Web App URL — paste it into index.html replacing REPLACE_WITH_YOUR_GOOGLE_SCRIPT_URL
 */

function doPost(request) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var order = JSON.parse(request.parameter.orderData);

  sheet.appendRow([
    new Date(),
    order.name,
    order.email,
    order.phone,
    order.orderType || "My Yard",
    order.recipientName || "",
    order.recipientPhone || "",
    order.recipientEmail || "",
    order.address,
    order.city,
    order.state,
    order.zip,
    order.package,
    order.goldenEgg ? "Yes" : "No",
    order.deliveryMethod,
    order.notes,
    "$" + order.total
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
