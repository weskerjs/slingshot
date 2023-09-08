# slingshot
> A webhook management & dispatcher package for AdonisJS 5

Slingshot comes with all the code necessary for your app to sling webhooks at whoever and wherever.

This package uses Redis and [@rlanz/bull-queue](https://github.com/RomainLanz/adonis-bull-queue)

## Installation

You will need Redis and @rlanz/bull-queue package setup before you install and configure this package.

```
# Install   
npm install @adonisaddons/slingshot  
  
# Configure  
node ace configure @adonisaddons/slingshot
```

## Usage

When triggering webhooks, ensure you're listening to the Queue using ```node ace queue:listen```

#### List Webhooks  
```
GET: /slingshot
```

# Create a new webhook
```
POST: /slingshot

# example body
{
    "name": "Test Webhook",
    "description": "It does things",
    "enabled": true,
    "url": "https://webhook.site/xxxxx-xxxxx-xxxxx",
    "requires_auth": false,
    "user_id": "1"
}
```

# Get Webhook
```
GET: /slingshot/:id
```

# Update Webhook
```
POST: /slingshot/:id

# example body
{
    "name": "Test Webhook",
    "description": "It does things",
    "enabled": true,
    "url": "https://webhook.site/xxxxx-xxxxx-xxxxx",
    "requires_auth": false,
    "user_id": "1"
}
```

# Delete Webhook  

```
DELETE: /slingshot/:id
```

# Trigger Webhook

The request body will be sent to the webhook URL

```
POST: /slingshot/:id/trigger
```