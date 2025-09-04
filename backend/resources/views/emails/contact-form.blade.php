<!DOCTYPE html>
<html>
<head>
    <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2F855A;">New Contact Form Submission</h2>
        
        <div style="margin-top: 20px;">
            <p><strong>Name:</strong> {{ $data['name'] }}</p>
            <p><strong>Email:</strong> {{ $data['email'] }}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px;">
                {{ $data['message'] }}
            </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This email was sent from the contact form at EcoHomeArt.</p>
        </div>
    </div>
</body>
</html>
