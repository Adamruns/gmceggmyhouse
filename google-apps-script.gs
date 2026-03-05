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

  sendConfirmationEmail(order);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendConfirmationEmail(order) {
  var deliveryLabel = order.deliveryMethod === "yard" ? "Yard Scatter" : "Porch Basket";
  var address = order.address + ", " + order.city + ", " + order.state + " " + order.zip;
  var goldenLabel = order.goldenEgg ? "Yes (+$5)" : "No";

  var recipientRow = "";
  if (order.recipientName) {
    recipientRow =
      '<tr>' +
        '<td style="padding:8px 12px;color:#6b5d7b;font-weight:600;font-size:14px;">Recipient</td>' +
        '<td style="padding:8px 12px;color:#2a1f3d;font-weight:600;font-size:14px;">' + order.recipientName + '</td>' +
      '</tr>';
  }

  var notesRow = "";
  if (order.notes) {
    notesRow =
      '<tr>' +
        '<td style="padding:8px 12px;color:#6b5d7b;font-weight:600;font-size:14px;">Instructions</td>' +
        '<td style="padding:8px 12px;color:#2a1f3d;font-weight:600;font-size:14px;">' + order.notes + '</td>' +
      '</tr>';
  }

  var html =
    '<div style="background-color:#fdf8ef;padding:32px 16px;font-family:Arial,sans-serif;">' +
      '<div style="max-width:520px;margin:0 auto;">' +

        // Header
        '<div style="background:linear-gradient(180deg,#2d1d45 0%,#442e66 100%);border-radius:16px 16px 0 0;padding:32px 24px;text-align:center;">' +
          '<p style="color:rgba(255,255,255,0.7);font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin:0 0 8px;">GMC Track &amp; Field</p>' +
          '<h1 style="color:#ffb606;font-size:28px;font-weight:900;font-style:italic;margin:0 0 8px;text-shadow:0 2px 0 rgba(0,0,0,0.2);">Egg My Yard</h1>' +
          '<p style="color:rgba(255,255,255,0.85);font-size:14px;margin:0;">Order Confirmation</p>' +
        '</div>' +

        // Body
        '<div style="background:#ffffff;padding:28px 24px;border:1px solid #e8e0f0;border-top:none;">' +
          '<p style="color:#2a1f3d;font-size:16px;margin:0 0 20px;">Hi ' + order.name + ',</p>' +
          '<p style="color:#6b5d7b;font-size:14px;margin:0 0 24px;">Thanks for your order! Here\'s your summary:</p>' +

          // Order details table
          '<div style="background:#fdf8ef;border-radius:12px;padding:4px 0;margin-bottom:24px;">' +
            '<table style="width:100%;border-collapse:collapse;">' +
              recipientRow +
              '<tr>' +
                '<td style="padding:8px 12px;color:#6b5d7b;font-weight:600;font-size:14px;">Package</td>' +
                '<td style="padding:8px 12px;color:#2a1f3d;font-weight:600;font-size:14px;">' + order.package + '</td>' +
              '</tr>' +
              '<tr>' +
                '<td style="padding:8px 12px;color:#6b5d7b;font-weight:600;font-size:14px;">Golden Egg</td>' +
                '<td style="padding:8px 12px;color:#2a1f3d;font-weight:600;font-size:14px;">' + goldenLabel + '</td>' +
              '</tr>' +
              '<tr>' +
                '<td style="padding:8px 12px;color:#6b5d7b;font-weight:600;font-size:14px;">Delivery</td>' +
                '<td style="padding:8px 12px;color:#2a1f3d;font-weight:600;font-size:14px;">' + deliveryLabel + '</td>' +
              '</tr>' +
              '<tr>' +
                '<td style="padding:8px 12px;color:#6b5d7b;font-weight:600;font-size:14px;">Address</td>' +
                '<td style="padding:8px 12px;color:#2a1f3d;font-weight:600;font-size:14px;">' + address + '</td>' +
              '</tr>' +
              notesRow +
            '</table>' +
          '</div>' +

          // Total
          '<div style="text-align:center;margin-bottom:24px;">' +
            '<p style="color:#6b5d7b;font-size:13px;margin:0 0 4px;">Order Total</p>' +
            '<p style="color:#442e66;font-size:32px;font-weight:900;margin:0;">$' + order.total + '.00</p>' +
          '</div>' +

          // Next steps
          '<div style="background:#f7f3fa;border-radius:12px;padding:16px 20px;text-align:center;">' +
            '<p style="color:#442e66;font-weight:700;font-size:14px;margin:0 0 4px;">What\'s Next?</p>' +
            '<p style="color:#6b5d7b;font-size:13px;margin:0;">Eggs will be delivered Easter Eve, April 4. The team will follow up with payment instructions.</p>' +
          '</div>' +
        '</div>' +

        // Footer
        '<div style="background:#2d1d45;border-radius:0 0 16px 16px;padding:20px 24px;text-align:center;">' +
          '<p style="color:rgba(255,255,255,0.6);font-size:12px;margin:0;">' +
            '<span style="color:#ffb606;font-weight:700;">GMC Track &amp; Field</span> · Greer Middle College Charter High School · Taylors, SC' +
          '</p>' +
        '</div>' +

      '</div>' +
    '</div>';

  MailApp.sendEmail({
    to: order.email,
    subject: "Egg My Yard — Order Confirmation",
    body: "Thanks for your Egg My Yard order! Package: " + order.package + ", Total: $" + order.total + ".00. Eggs delivered Easter Eve, April 4.",
    htmlBody: html,
    name: "GMC Track & Field",
    replyTo: "adentler@greermiddlecollege.org"
  });
}
