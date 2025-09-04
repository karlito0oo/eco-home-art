<!DOCTYPE html>
<html>
<head>
    <title>Message Received</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Thank you for contacting us!</h2>
        
        <p>Dear {{ $data['name'] }},</p>
        
        <p>We have received your message and will get back to you as soon as possible.</p>
        
        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #4CAF50;">
            <p><strong>Your message details:</strong></p>
            <p><strong>Message:</strong><br>{{ $data['message'] }}</p>
        </div>
        
        <p>Best regards,<br>EcoHomeArt</p>
    </div>
</body>
</html>
