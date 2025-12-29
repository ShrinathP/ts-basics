interface MyUser {
  name: string;
  id: string;
  email?: string;
  phone?: string;
}

// interface MyUserOptionals {
//   name?: string;
//   id?: string;
//   email?: string;
// }

// The issue with the above interfaces is that if later i add a new variable
// phone to User interface, i need to add the same to MyUserOptionals
// Partial, does the same
// it takes a type and makes everything in it Optional

// ## 0
// Partial Type - same Object with all fields Optionals
type MyUserOptionals = Partial<MyUser>;

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  merge(
    {
      name: "Jack",
      id: "foo",
      email: "dontemail@dontemail.com",
    },
    {
      email: "dontemailbaz@dontemail.com",
    }
  )
);

// ## 1
// Required Type - same Object with all fields Required
type RequiredMyUser = Required<MyUser>;

// ## 2
// Pick Type - pick only 2 fields from the object
type JustEmailAndName = Pick<MyUser, "email" | "name">;

const mapById = (users: MyUser[]): Record<string, MyUser> => {
  return users.reduce((acc, user) => {
    return {
      ...acc,
      [user.id]: user,
    };
  }, {});
};

console.log(
  mapById([
    {
      id: "foo",
      name: "Mr. Foo",
    },
    {
      id: "baz",
      name: "Mr. Baz",
    },
  ])
);

// ## 3 Omit Utility type -  omits a field from Object
const mapByIdNoId = (users: MyUser[]): Record<string, Omit<MyUser, "id">> => {
  return users.reduce((acc, user) => {
    const { id, ...other } = user;
    return {
      ...acc,
      [id]: other,
    };
  }, {});
};

type UserWithoutID = Omit<MyUser, "id">;
// ## 4
// Types from fields: Record<MyUser["id"], UserWithoutID>
const mapByIdNoIdEnhance = (
  users: MyUser[]
): Record<MyUser["id"], UserWithoutID> => {
  return users.reduce((acc, user) => {
    const { id, ...other } = user;
    return {
      ...acc,
      [id]: other,
    };
  }, {});
};

console.log(
  mapByIdNoId([
    {
      id: "foo",
      name: "Mr. Foo",
    },
    {
      id: "baz",
      name: "Mr. Baz",
    },
  ])
);
