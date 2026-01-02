interface Compute {
  start(): void;
}

interface Storage {
  upload(file: string): void;
}

interface Queue {
  send(message: string): void;
}


// Concrete Products AWS Family
class EC2 implements Compute {
  start() {
    console.log("Starting EC2 instance");
  }
}

class S3 implements Storage {
  upload(file: string) {
    console.log(`Uploading ${file} to S3`);
  }
}

class SQS implements Queue {
  send(message: string) {
    console.log(`Sending message to SQS: ${message}`);
  }
}

// Concrete Products GCP Family
class GCE implements Compute {
  start() {
    console.log("Starting GCE instance");
  }
}

class GCS implements Storage {
  upload(file: string) {
    console.log(`Uploading ${file} to GCS`);
  }
}

class PubSub implements Queue {
  send(message: string) {
    console.log(`Publishing message to Pub/Sub: ${message}`);
  }
}

interface CloudFactory {
  createCompute(): Compute;
  createStorage(): Storage;
  createQueue(): Queue;
}

class AWSFactory implements CloudFactory {
  createCompute(): Compute {
    return new EC2();
  }

  createStorage(): Storage {
    return new S3();
  }

  createQueue(): Queue {
    return new SQS();
  }
}

class GCPFactory implements CloudFactory {
  createCompute(): Compute {
    return new GCE();
  }

  createStorage(): Storage {
    return new GCS();
  }

  createQueue(): Queue {
    return new PubSub();
  }
}

class DeploymentService {
  constructor(private factory: CloudFactory) {}

  deployApp() {
    const compute = this.factory.createCompute();
    const storage = this.factory.createStorage();
    const queue = this.factory.createQueue();

    compute.start();
    storage.upload("app.zip");
    queue.send("Deployment complete");
  }
}



function getCloudFactory(provider: "aws" | "gcp"): CloudFactory {
  switch (provider) {
    case "aws": return new AWSFactory();
    case "gcp": return new GCPFactory();
  }
}

const factory = getCloudFactory("aws");
const service = new DeploymentService(factory);

service.deployApp();

