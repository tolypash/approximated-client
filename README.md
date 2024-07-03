# approximated-client

Client for approximated.app written in TypeScript

## Installation

**npm:**

```bash
npm install approximated-client
```

**yarn:**

```bash
yarn add approximated-client
```

## Usage

```typescript
import { ApproximatedClient } from "approximated-client";

const client = new ApproximatedClient({
  apiKey: "your-api-key", // Your approximated API key
});

client.createVirtualHost({
    incoming_address: "acustomdomain.com",
    target_address: "myapp.com",
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
```
