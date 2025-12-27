// google gemini 
// can i create a pluckpath function for nested json values in ts
// IMP

// ##6 
// Advanced pluck from Nested JSON
// where we can pluck a specific path
function pluckPath<T, R>(obj: T, path: string): R | undefined {
  // Split the path string into an array of keys using the dot separator
  const keys = path.split('.');

  // Use Array.prototype.reduce() to traverse the object
  // keeps plucking the keys one by one
  const result = keys.reduce((currentObj: any, key: string) => {
    // Check if the current object is null or undefined before accessing the key
    if (currentObj && typeof currentObj === 'object') {
      console.log(`pluck val for ${key} : ${JSON.stringify(currentObj[key])}`);
      return currentObj[key];
      
    }
    // If any part of the path is invalid, subsequent iterations return undefined
    return undefined;
  }, obj); // Start the reduction with the original object

  return result as R | undefined;
}


// Usage Example
interface User {
  id: number;
  name: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    email: string;
    phone: string;
  };
}

const user: User = {
  id: 1,
  name: "John Doe",
  address: {
    street: "123 Main St",
    city: "Anytown",
    zipCode: "12345",
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
  },
  contact: {
    email: "john@example.com",
    phone: "555-5555",
  },
};

// Example 1: Accessing a deeply nested value
const zipCode = pluckPath<User, string>(user, 'address.zipCode');
console.log(`Zip Code: ${zipCode}`); // Output: Zip Code: 12345

// Example 2: Accessing a non-existent path (returns undefined safely)
const country = pluckPath<User, string>(user, 'address.country');
console.log(`Country: ${country}`); // Output: Country: undefined

// Example 3: Accessing a nested value with optional properties
const latitude = pluckPath<User, number>(user, 'address.coordinates.latitude');
console.log(`Latitude: ${latitude}`); // Output: Latitude: 40.7128


